import argon2 from "argon2";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { PasswordMinError } from "./errors/password-min-error";

/* 
    Use case para registrar um novo usuário,
    aqui é onde a lógica de negócio para o registro de um usuário é implementada,
    como validação de dados, verificação de email já existente, hash da senha, etc.
*/
interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    password: string;
}
export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({ nome, email, password }: RegisterUseCaseRequest) {
        const userByEmail = await this.usersRepository.findByEmail(email);
        if (userByEmail) {
            throw new UserAlreadyExistsError();
        }
        if (password.length < 6) {
            throw new PasswordMinError();
        }
        const passwordHash = await argon2.hash(password);
        await this.usersRepository.create({
            nome,
            email,
            password_hash: passwordHash
        });
    }
}
