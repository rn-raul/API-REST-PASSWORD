import fastify from "fastify";
import {usuariosRoutes} from "./routes/usuarios";
import { passwordsRoutes } from "./routes/passwords";

export const app = fastify();
app.register(usuariosRoutes, {prefix: '/api'})
app.register(passwordsRoutes, {prefix: '/api'})
