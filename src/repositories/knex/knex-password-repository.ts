import { Tables } from "knex/types/tables";
import { PasswordsRepository } from "../passwords-repository";
import { knex } from "../../database";

export class KnexPasswordsRepository implements PasswordsRepository {
    async update(id: string, userId: string, data: { service?: string; password_hash?: string; notes?: string | null; }): Promise<void> {
        await knex("passwords")
            .where({
                id: id,
                user_id: userId
            })
            .update(data);
    }

    async deleteById(id: string, userId: string): Promise<boolean> {
        const deletedRows = await knex("passwords")
            .where({
                id: id,
                user_id: userId
            }).delete();
        return deletedRows > 0;
    }
    async findById(id: string, userId: string): Promise<Tables["passwords"] | undefined> {
        const password = await knex("passwords")
            .where({
                id: id,
                user_id: userId
            })
            .first();

        return password;
    }
    async findManyByUserId(userId: string): Promise<Tables["passwords"][]> {
        const passwords = await knex("passwords").where({
            user_id: userId,
        });

        return passwords;
    }
    async create(data: { user_id: string; service: string; password_hash: string; notes?: string; }): Promise<Tables["passwords"]> {
        const [password] = await knex("passwords").insert({
            id: crypto.randomUUID(),
            ...data
        }).returning("*");
        return password;
    }
}

