import zod from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists";
import { PasswordMinError } from "../../use-cases/errors/password-min-error";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case-";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createUserBody = zod.object({
        nome: zod.string(),
        email: zod.string(),
        password: zod.string().min(6),
    });
    const { nome, email, password } = createUserBody.parse(request.body);
    try {
        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.execute({ nome, email, password });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message,
            });
        }
        if (error instanceof PasswordMinError) {
            return reply.status(400).send({
                message: error.message,
            });
        }
        throw error;
    }
    return reply.status(201).send({ message: "Usuário criado com sucesso" });
}
