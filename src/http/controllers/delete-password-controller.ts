import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeletePasswordUseCase } from "../../use-cases/factories/make-delete-password-use-case";


export async function deletePasswordById(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id;
    if (!userId) {
        return reply.status(401).send({ message: "Não autorizado" });
    }
    const paramSchema = z.object({
        id: z.string(),
    });
    const { id } = paramSchema.parse(request.params);
    try {
        const deletePasswordUseCase = makeDeletePasswordUseCase();
        await deletePasswordUseCase.execute({ id, userId });
        return reply.send({ message: "Senha excluída com sucesso" });
    } catch (error) {
        return reply.status(500).send({ message: "Erro ao excluir senha do usuário" });
    }
}