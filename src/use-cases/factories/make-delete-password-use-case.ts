import { KnexPasswordsRepository } from "../../repositories/knex/knex-password-repository";
import { DeletePasswordUseCase } from "../delete-password-by-id";

export function makeDeletePasswordUseCase() {
    const passwordsRepository = new KnexPasswordsRepository();
    const deletePasswordUseCase = new DeletePasswordUseCase(passwordsRepository);
    
    return deletePasswordUseCase;
}