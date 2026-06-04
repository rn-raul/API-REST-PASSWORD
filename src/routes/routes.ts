import { FastifyInstance } from "fastify";
import { authenticate } from "../http/controllers/authenticate-controller";
import { register } from "../http/controllers/register-controller";
import { logout } from "../http/controllers/logout-controller";
import { authJwt } from "../middlewares/auth-jwt";
import { newPassword } from "../http/controllers/new-password-controller";
import {getPasswordById} from "../http/controllers/get-password-by-id";
import { deletePasswordById } from "../http/controllers/delete-password-controller";
import {fetchUserPasswords} from "../http/controllers/fetch-user-passwords-controller";
import { updatePassword } from "../http/controllers/update-password-controller";
export async function appRoutes(app: FastifyInstance) {
      app.post("/register", register);
      app.post("/login", authenticate);
      app.post("/logout", { preHandler: authJwt }, logout);
      app.post("/new-password", { preHandler: authJwt }, newPassword);
      app.get("/password/:id", { preHandler: authJwt }, getPasswordById);
      app.delete("/password/:id", { preHandler: authJwt }, deletePasswordById);
      app.get("/passwords", { preHandler: authJwt }, fetchUserPasswords);
      app.put("/password/:id", { preHandler: authJwt }, updatePassword);
}