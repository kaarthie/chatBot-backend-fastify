import { searchController } from "./search.controllers.js"
async function searchRoutes(fastify,options){
    fastify.post("/search",searchController);

}
export {searchRoutes}