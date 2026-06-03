import { NewPasswordRepository } from "../repositories/new-password-repository";
import { decrypt } from "../utils/crypto";

interface GetPasswordByIdUseCaseRequest {
    id: string;
}
interface GetPasswordByIdUseCaseResponse {
    password: {
        id: string;
        service: string;
        password_hash: string;
        notes: string | null;
    } | null;
}
export class GetPasswordById {
    
}