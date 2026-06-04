import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetPasswordByIdUseCase } from "../../use-cases/factories/make-get-password-by-id-use-case";
export async function getPasswordById(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id;
    if (!userId) {
        return reply.status(401).send({ message: "Não autorizado" });
    }
    const paramSchema = z.object({
        id: z.string(),
    });
    const { id } = paramSchema.parse(request.params);
    try {
        const getPasswordByIdUseCase = makeGetPasswordByIdUseCase();
        const { password } = await getPasswordByIdUseCase.execute({ id, userId });
        return reply.send({
            password,
        })
    } catch (error) {
        return reply.status(500).send({ message: "Erro ao buscar senha do usuário" });
    }
}