import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { authJwt } from "../middlewares/auth-jwt";
import {  z } from "zod";
import { decrypt, encrypt } from "../utils/crypto";

export async function passwordsRoutes(app: FastifyInstance) {
  app.put("/password/:id", { preHandler: authJwt }, async (request, reply) => {
    const paramSchema = z.object({
      id: z.string(),
    });
    const { id } = paramSchema.parse(request.params);
    const updatePasswordBody = z.object({
      service: z.string().optional(),
      password: z.string().optional(),
      notes: z.string().optional(),
    });
    const { service, password, notes } = updatePasswordBody.parse(request.body);
    const passwordData = await knex("passwords")
      .where({ id, user_id: request.user?.id })
      .first();
    if (!passwordData) {
      return reply.status(404).send({ error: "Dados não encontrados." });
    }
    await knex("passwords")
      .where({ id })
      .update({
        service: service,
        password_hash: password
          ? encrypt(password)
          : passwordData.password_hash, // Se a senha for fornecida, criptografa e atualiza, caso contrário mantém a senha antiga
        notes: notes,
      });
    return reply.send({
      message: "Senha atualizada com sucesso.",
    });
  });
  app.get("/password/:id", { preHandler: authJwt }, async (request, reply) => {
    const paramSchema = z.object({
      id: z.string(),
    });
    const { id } = paramSchema.parse(request.params);
    const password = await knex("passwords")
      .where({ id, user_id: request.user?.id })
      .first();
    if (!password) {
      return reply.status(404).send({ error: "Dados não encontrados." });
    }
    return reply.send({
      id: password.id,
      service: password.service,
      password: decrypt(password.password_hash),
      notes: password.notes,
    });
  });
  app.delete(
    "/password/:id",
    { preHandler: authJwt },
    async (request, reply) => {
      const paramSchema = z.object({
        id: z.string(),
      });
      const { id } = paramSchema.parse(request.params);
      const password = await knex("passwords")
        .where({ id, user_id: request.user?.id })
        .delete();
      if (!password) {
        return reply.status(404).send({ error: "Dados não encontrados." });
      }
      return reply.send({ message: "Senha deletada com sucesso." });
    },
  );
}
