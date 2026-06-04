import { KnexPasswordsRepository } from "../../repositories/knex/knex-password-repository";
import { NewPasswordUseCase } from "../new-password";
import { KnexUsersRepository } from "../../repositories/knex/knex-users-repository";


export function makeNewPasswordUseCase() {
    const newPasswordRepository = new KnexPasswordsRepository();
    const usersRepository = new KnexUsersRepository();
    const newPasswordUseCase = new NewPasswordUseCase(newPasswordRepository, usersRepository);
    return newPasswordUseCase;
}