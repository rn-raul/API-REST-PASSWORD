import { FastifyInstance } from "fastify";
import { authenticate } from "../http/controllers/authenticate-controller";
import { register } from "../http/controllers/register-controller";
import { logout } from "../http/controllers/logout-controller";
import { authJwt } from "../middlewares/auth-jwt";
import { newPassword } from "../http/controllers/new-password-controller";

export async function appRoutes(app: FastifyInstance) {
      app.post("/register", register);
      app.post("/login", authenticate);
      app.post("/logout", { preHandler: authJwt }, logout);
      app.post("/new-password", { preHandler: authJwt }, newPassword);
}