import { PasswordsRepository } from "../repositories/passwords-repository";
import { decrypt } from "../utils/crypto";

interface GetPasswordByIdUseCaseRequest {
    id: string;
    userId: string;
}
interface GetPasswordByIdUseCaseResponse {
    password: {
        id: string;
        service: string;
        password_hash: string;
        notes: string | null;
    } | null;
}
export class GetPasswordByIdUseCase {
    constructor(private passwordRepository: PasswordsRepository) { }
    async execute({ id, userId }: GetPasswordByIdUseCaseRequest): Promise<GetPasswordByIdUseCaseResponse> {
        const password = await this.passwordRepository.findById(id, userId);
        if (!password) {
            throw new Error("Password not found");
        }
        return {
            password: {
                id: password.id,
                service: password.service,
                password_hash: decrypt(password.password_hash),
                notes: password.notes
            }
        }
    }
}