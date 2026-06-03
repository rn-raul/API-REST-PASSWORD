import { Authenticate } from "../../use-cases/authenticate";
import { KnexUsersRepository } from "../../repositories/knex/knex-users-repository";
export function makeAuthenticateUseCase() {
    const usersRepository = new KnexUsersRepository();
    const authenticateUseCase = new Authenticate(usersRepository);
    return authenticateUseCase;
}