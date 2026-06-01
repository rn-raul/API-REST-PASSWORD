import { FastifyReply, FastifyRequest } from "fastify";
import zod from "zod";
import { Authenticate } from "../../use-cases/authenticate";
import { KnexUsersRepository } from "../../repositories/knex/knex-users-repository";
import { AuthenticationError } from "../../use-cases/errors/authentication-errors";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const loginBody = zod.object({
        email: zod.string(),
        password: zod.string(),
    });
    const { email, password } = loginBody.parse(request.body);
    try {
        const usersRepository = new KnexUsersRepository();
        const authenticateUseCase = new Authenticate(usersRepository);
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
