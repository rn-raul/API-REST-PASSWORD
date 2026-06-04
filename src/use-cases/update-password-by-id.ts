import { PasswordsRepository } from "../repositories/passwords-repository";
import { encrypt } from "../utils/crypto";

interface GetPasswordByIdUseCaseRequest {
    id: string;
    userId: string;
    service?: string;
    password?: string;
    notes?: string;
}
export class UpdatePasswordByIdUseCase {
    constructor(private passwordRepository: PasswordsRepository) { }
    async execute({ id, userId, service, password, notes }: GetPasswordByIdUseCaseRequest): Promise<void> {
        const passwordUpdate = await this.passwordRepository.findById(id, userId);
        if (!passwordUpdate) {
            throw new Error("Password not found");
        }
        const passwordHash = password ? encrypt(password) : undefined;
        await this.passwordRepository.update(id, userId, {
            service,
            password_hash: passwordHash,
            notes: notes !== undefined ? (notes || null) : undefined,
        });
    }
}