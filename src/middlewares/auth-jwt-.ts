import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../env";
import { isTokenRevoked } from "../services/tokenBlackList";
export async function authJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    const isRevoked = await isTokenRevoked(token);
    if (isRevoked) {
      return reply.status(401).send({ message: "Token revogado" });
    }
    const decoded = jwt.verify(token, env.SECRET_KEY);
    request.user = decoded as any;
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido" });
  }
}
