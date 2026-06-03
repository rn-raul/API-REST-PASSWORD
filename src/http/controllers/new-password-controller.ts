import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeNewPasswordUseCase } from "../../use-cases/factories/make-new-password-use-case";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";
export async function newPassword(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id;
    const createPasswordBody = z.object({
        service: z.string().min(6),
        password: z.string(),
        notes: z.string().optional(),
    });
    const { service, password, notes } = createPasswordBody.parse(
        request.body,
    );
    if (!userId) {
        return reply.status(401).send({ message: "Não autorizado" });
    }
    try {
        const newPasswordUseCase = makeNewPasswordUseCase();
        await newPasswordUseCase.execute({
            userId,
            service,
            password,
            notes,
        });
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
    }
    return reply.status(201).send();
}