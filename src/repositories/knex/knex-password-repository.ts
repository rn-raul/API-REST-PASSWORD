import { Tables } from "knex/types/tables";
import { NewPasswordRepository } from "../new-password-repository";
import { knex } from "../../database";

export class KnexPasswordRepository implements NewPasswordRepository {
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

