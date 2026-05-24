import { FastifyInstance } from "fastify";
import zod from "zod";
import { knex } from "../database";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env } from "../env";
import {addToBlackList} from '../services/tokenBlackList';
import { authJwt } from "../middlewares/auth-jwt-";
export async function usuariosRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const createUserBody = zod.object({
      nome: zod.string(),
      email: zod.string(),
      password: zod.string(),
    });
    const { nome, email, password } = createUserBody.parse(request.body);
    const userByEmail = await knex("users").where({ email }).first();
    if (userByEmail) {
      return reply.status(400).send({ message: "Email já cadastrado" });
    }
    if (password.length < 6) {
      return reply
        .status(400)
        .send({ message: "A senha deve conter no mínimo 6 caracteres" });
    }
    const passwordHash = await argon2.hash(password);
    await knex("users").insert({
      id: randomUUID(),
      nome,
      email,
      password_hash: passwordHash,
    });
    return reply.status(201).send({ message: "Usuário criado com sucesso" });
  });
  app.post("/login", async (request, reply) => {
    const loginBody = zod.object({
      email: zod.string(),
      password: zod.string(),
    });
    const { email, password } = loginBody.parse(request.body);
    const user = await knex("users").where({ email }).first();
    if (!user || !(await argon2.verify(user.password_hash, password))) {
      return reply.status(400).send({ message: "Email ou senha inválidos" });
    }
    const expiresIn = 5 * 60; // 5 minutos
    const token = jwt.sign({ id: user.id }, env.SECRET_KEY, {
      expiresIn: expiresIn,
    });
    return reply.status(200).send({
      message: "Login realizado com sucesso",
      token: token,
      expiresIn: expiresIn,
    });
  });
  app.get("/logout", { preHandler: authJwt }, async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    await addToBlackList(token, request.user!.id);
    return reply.status(200).send({ message: "Logout realizado com sucesso" });
  });
}
