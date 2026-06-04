import { KnexPasswordsRepository } from "../../repositories/knex/knex-password-repository";
import { FetchUserPasswordsUseCase } from "../fetch-user-passwords";
export function makeFetchUserPasswordsUseCase() {
    const passwordsRepository = new KnexPasswordsRepository();
    const fetchUserPasswordsUseCase = new FetchUserPasswordsUseCase(passwordsRepository);
    return fetchUserPasswordsUseCase;
}