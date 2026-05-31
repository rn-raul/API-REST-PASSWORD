import { randomUUID } from "crypto";
import { knex } from "../database";


export class KnexUsersRepository {
    async findByEmail(email: string) {
        const userByEmail = await knex("users").where({ email }).first();
        return userByEmail;
    }
    async create(data: { nome: string; email: string; password_hash: string }) {
        const user = await knex("users").insert({
            id: randomUUID(),
            ...data
        });
        return user;
    }
}