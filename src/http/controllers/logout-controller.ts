import { FastifyReply, FastifyRequest } from "fastify";
import { addToBlackList } from "../../utils/tokenBlackList";

export async function logout(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return reply.status(401).send({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    await addToBlackList(token, request.user!.id);
    return reply.status(200).send({ message: "Logout realizado com sucesso" });
}
