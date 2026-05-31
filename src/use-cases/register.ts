import { randomUUID } from "crypto";
import { knex } from "../database";
import argon2 from "argon2";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    password: string;
}
export async function registerUseCase({ nome, email, password }: RegisterUseCaseRequest) {
    const userByEmail = await knex("users").where({ email }).first();
    if (userByEmail) {
        throw new Error("Email já cadastrado");
    }
    if (password.length < 6) {
        throw new Error("A senha deve conter no mínimo 6 caracteres");
    }
    const passwordHash = await argon2.hash(password);
    await knex("users").insert({
        id: randomUUID(),
        nome,
        email,
        password_hash: passwordHash,
    });
}