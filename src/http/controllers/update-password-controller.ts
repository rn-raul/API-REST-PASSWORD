import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdatePasswordUseCase } from "../../use-cases/factories/make-update-password-use-case";

export async function updatePassword(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id;

    if (!userId) {
        return reply.status(401).send({ message: "Não autorizado" });
    }

    const paramSchema = z.object({
        id: z.string(),
    });

    const updatePasswordBody = z.object({
        service: z.string().optional(),
        password: z.string().optional(),
        notes: z.string().optional(),
    });

    const { id } = paramSchema.parse(request.params);
    const { service, password, notes } = updatePasswordBody.parse(request.body);

    try {
        const updatePasswordUseCase = makeUpdatePasswordUseCase();

        await updatePasswordUseCase.execute({
            id,
            userId,
            service,
            password,
            notes,
        });

        return reply.send({ message: "Senha atualizada com sucesso." });

    } catch (err) {
        if (err instanceof Error && err.message === "Password not found") {
            return reply.status(404).send({ error: "Dados não encontrados." });
        }

        return reply.status(400).send({ message: "Erro ao atualizar a senha" });
    }
}