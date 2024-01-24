import { fastifyPassport } from "../../middlewares/passport.js";
import { loginGoogleController } from "./auth.controller.js";

async function authRoutes(fastify, options) {
  fastify.get(
    "/user/login/google",
    fastifyPassport.authenticate("google", { scope: ["profile", "email"] })
  );
  fastify.get(
    "/user/login/google/redirect",
    {
      preValidation: fastifyPassport.authenticate("google", {
        scope: ["profile", "email"],
      }),
    },
    loginGoogleController
  );
  // fastify.get("/user/profile")
}
export { authRoutes };
