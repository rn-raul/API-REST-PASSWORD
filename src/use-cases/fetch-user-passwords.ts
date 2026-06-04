import { PasswordsRepository } from "../repositories/passwords-repository";
import { decrypt } from "../utils/crypto";


interface FetchUserPasswordsUseCaseRequest {
    userId: string;
}

interface FetchUserPasswordsUseCaseResponse {
    passwords: {
        id: string;
        service: string;
        password: string;
        notes: string | null;
    }[];
}
export class FetchUserPasswordsUseCase {
    constructor(private passwordRepository: PasswordsRepository) { }
    async execute({ userId }: FetchUserPasswordsUseCaseRequest): Promise<FetchUserPasswordsUseCaseResponse> {
        const passwords = await this.passwordRepository.findManyByUserId(userId);
        if (!passwords) {
            throw new Error("Password not found");
        }
        const mappedPasswords = passwords.map(password => ({
            id: password.id,
            service: password.service,
            password: decrypt(password.password_hash),
            notes: password.notes,
        }))
        return {
            passwords: mappedPasswords,
        };
    }
}