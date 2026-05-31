import argon2 from "argon2";
import { KnexUsersRepository } from "../repositories/knex-users-repository";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    password: string;
}
export async function registerUseCase({ nome, email, password }: RegisterUseCaseRequest) {
    const knexUsersRepository = new KnexUsersRepository();
    const userByEmail = await new KnexUsersRepository().findByEmail(email);
    if (userByEmail) {
        throw new Error("Email já cadastrado");
    }
    if (password.length < 6) {
        throw new Error("A senha deve conter no mínimo 6 caracteres");
    }
    const passwordHash = await argon2.hash(password);
    await knexUsersRepository.create({
        nome,
        email,
        password_hash: passwordHash
    });
}