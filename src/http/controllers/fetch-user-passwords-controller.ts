import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUserPasswordsUseCase } from "../../use-cases/factories/make-fetch-user-password-use-case";

export async function fetchUserPasswords(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id;
    if (!userId) {
        return reply.status(401).send({ message: "Não autorizado" });
    }
    try {
        const fetchUserPasswordsUseCase = makeFetchUserPasswordsUseCase();
        const { passwords } = await fetchUserPasswordsUseCase.execute({ userId });
        return reply.send({
            passwords,
        })
    } catch (error) {
        return reply.status(500).send({ message: "Erro ao buscar senhas do usuário" });
    }
}