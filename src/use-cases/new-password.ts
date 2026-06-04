import { PasswordsRepository } from "../repositories/passwords-repository";
import { UsersRepository } from "../repositories/users-repository";
import { encrypt } from "../utils/crypto";
type NewPasswordUseCaseRequest = {
    userId: string;
    service: string;
    password: string;
    notes?: string;
}
export class NewPasswordUseCase {
    constructor(private passwordRepository: PasswordsRepository, private usersRepository: UsersRepository) { }
    async execute({
        userId,
        service,
        password,
        notes
    }: NewPasswordUseCaseRequest): Promise<void> {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordHash = encrypt(password)
        await this.passwordRepository.create({
            user_id: userId,
            service,
            password_hash: passwordHash,
            notes: notes || undefined,
        });
    }
}