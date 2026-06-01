import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { UsersRepository } from "../repositories/users-repository";

/* 
    Aqui temos o caso de uso da autenticação,
    onde o usuário fornece seu e-mail e senha, e o sistema verifica se as credenciais estão corretas.
    Se as credenciais estiverem corretas, o sistema gera um token JWT que o usuário pode usar para acessar recursos protegidos.
*/
interface AuthenticateUseCase {
    email: string;
    password: string;
}
export class Authenticate {
    constructor(private usersRepository: UsersRepository) { }
    async execute({ email, password }: AuthenticateUseCase) {
        const userByEmail = await this.usersRepository.findByEmail(email);
        if (!userByEmail) {
            throw new Error("E-mail ou senha inválidos");
        }
        const passwordMatch = await argon2.verify(userByEmail.password_hash, password);
        if (!passwordMatch) {
            throw new Error("E-mail ou senha inválidos");
        }
        const expiresIn = 5 * 60; // 5 minutos
        const token = jwt.sign({ id: userByEmail.id }, env.SECRET_KEY, {
            expiresIn: expiresIn,
        });
        return { token, expiresIn };
    }
}