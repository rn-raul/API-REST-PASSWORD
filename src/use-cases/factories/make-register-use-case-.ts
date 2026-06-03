import { RegisterUseCase } from "../../use-cases/register";
import { KnexUsersRepository } from "../../repositories/knex/knex-users-repository";

export function makeRegisterUseCase() {
    const usersRepository = new KnexUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    return registerUseCase;
}