import { NewPasswordRepository } from "../repositories/new-password-repository";
import { decrypt } from "../utils/crypto";


interface FetchUserPasswordsUseCaseRequest {
    userId: string;
}

interface FetchUserPasswordsUseCaseResponse {
    passwords: {
        id: string;
        service: string;
        password_hash: string;
        notes: string | null;
    }[];
}
export class FetchUserPasswords {
    constructor(private passwordRepository: NewPasswordRepository) { }
    async execute({ userId }: FetchUserPasswordsUseCaseRequest): Promise<FetchUserPasswordsUseCaseResponse> {
        const passwords = await this.passwordRepository.findManyByUserId(userId);
        const mappedPasswords = passwords.map(password => ({
            id: password.id,
            service: password.service,
            password_hash: decrypt(password.password_hash),
            notes: password.notes,
        }))
        return {
            passwords: mappedPasswords,
        };
    }
}