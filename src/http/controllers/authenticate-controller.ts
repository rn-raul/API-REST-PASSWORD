import { FastifyReply, FastifyRequest } from "fastify";
import zod from "zod";
import { Authenticate } from "../../use-cases/authenticate";
import { KnexUsersRepository } from "../../repositories/knex/knex-users-repository";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const loginBody = zod.object({
        email: zod.string(),
        password: zod.string(),
    });
    const { email, password } = loginBody.parse(request.body);
    try {
        const knexUsersRepository = new KnexUsersRepository();
        const { token, expiresIn } = await new Authenticate(knexUsersRepository).execute({ email, password });
        return reply.status(200).send({ token, expiresIn });
    } catch (error) {
        return reply.status(401).send(
            error instanceof Error ? { message: error.message } : { message: "An unexpected error occurred" }
        );
    }
}
