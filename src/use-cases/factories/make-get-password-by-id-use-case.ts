import { KnexPasswordsRepository } from "../../repositories/knex/knex-password-repository";
import { GetPasswordByIdUseCase } from "../get-password-by-Id";

export function makeGetPasswordByIdUseCase() {
    const passwordRepository = new KnexPasswordsRepository();
    const getPasswordByIdUseCase = new GetPasswordByIdUseCase(passwordRepository);
    return getPasswordByIdUseCase;
}