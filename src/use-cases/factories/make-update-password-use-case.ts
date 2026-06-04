import { KnexPasswordsRepository } from "../../repositories/knex/knex-password-repository";
import { UpdatePasswordByIdUseCase } from "../update-password-by-id";

export function makeUpdatePasswordUseCase() {
    const passwordsRepository = new KnexPasswordsRepository();
    const updatePasswordUseCase = new UpdatePasswordByIdUseCase(passwordsRepository);

    return updatePasswordUseCase;
}