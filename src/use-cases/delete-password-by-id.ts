import { PasswordsRepository } from "../repositories/passwords-repository";

interface DeletePasswordByIdUseCaseRequest {
    id: string;
    userId: string;
}

export class DeletePasswordUseCase {
    constructor(private passwordsRepository: PasswordsRepository) { }

    async execute({ id, userId }: DeletePasswordByIdUseCaseRequest): Promise<void> {
        const isDeleted = await this.passwordsRepository.deleteById(id, userId);

        if (!isDeleted) {
            throw new Error("Password not found");
        }
    }
}