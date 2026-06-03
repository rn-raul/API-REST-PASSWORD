import { KnexPasswordRepository } from "../../repositories/knex/knex-password-repository";
import { FetchUserPasswords } from "../fetch-user-passwords";
export function makeFetchUserPasswordsUseCase() {
    const passwordsRepository = new KnexPasswordRepository();
    const fetchUserPasswordsUseCase = new FetchUserPasswords(passwordsRepository);
    return fetchUserPasswordsUseCase;
}