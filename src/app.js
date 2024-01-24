import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import fastifyCookie from "@fastify/cookie";
import { authRoutes } from "./apis/auth/auth.routes.js";
import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { searchRoutes } from "./apis/search/search.routes.js";
import { bookingRoutes } from "./apis/booking/booking.routes.js";
import { chatRoutes } from "./apis/chatHistory/chatHistory.routes.js";
import { paymentRoutes } from "./apis/payment/payment.routes.js";
import { cancelRoutes } from "./apis/cancellation/cancel.routes.js";

const server = fastify();
server.register(fastifyCors, {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://garfish-big-properly.ngrok-free.app",
    "https://natural-vaguely-killdeer.ngrok-free.app",
  ],
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Ngrok-Skip-Browser-Warning",
  ],
  // allowedHeaders:["Ngrok-Skip-Browser-Warning","Authorization"]
});
server.register(fastifyCookie);
const secret = randomBytes(32).toString("hex");



server.register(fastifySecureSession, {
  secret: Buffer.from(secret, "hex"), // replace with your actual secret key
  cookie: {
    path: "/",
    secure: true, 
    sameSite:"none",
    credentials:true
  },
});

server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

server.get("/dummy", (request, reply) => {
  console.log(request.user);

  if (request.isAuthenticated()) {
    console.log(request.cookies)

    reply.send(request.user);
  } else {
    reply.send("Not authenticated");
  }
 
});

server.register(authRoutes);
server.register(chatRoutes);
server.register(searchRoutes);
server.register(bookingRoutes);
server.register(paymentRoutes);
server.register(cancelRoutes);
async function main() {
  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });
    console.log("server is running on port 4000");
    console.log(uuidv4());
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();
