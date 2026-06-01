import { FastifyInstance } from "fastify";
import { authenticate } from "../http/controllers/authenticate-controller";
import { register } from "../http/controllers/register-controller";
import { logout } from "../http/controllers/logout-controller";
import { authJwt } from "../middlewares/auth-jwt";

export async function appRoutes(app: FastifyInstance) {
      app.post("/register", register);
      app.post("/login", authenticate);
      app.post("/logout", { preHandler: authJwt }, logout);
}