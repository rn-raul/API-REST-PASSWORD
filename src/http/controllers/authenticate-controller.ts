import { FastifyReply, FastifyRequest } from "fastify";
import zod from "zod";
import { AuthenticationError } from "../../use-cases/errors/authentication-errors";
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const loginBody = zod.object({
        email: zod.string(),
        password: zod.string(),
    });
    const { email, password } = loginBody.parse(request.body);
    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { token, expiresIn } = await authenticateUseCase.execute({ email, password });
        return reply.status(200).send({
            message: "Autenticação realizada com sucesso",
            token,
            expiresIn,
        });
    } catch (error) {
        if (error instanceof AuthenticationError) {
            return reply.status(401).send({
                message: error.message,
            });
        }
        throw error;
    }
}
