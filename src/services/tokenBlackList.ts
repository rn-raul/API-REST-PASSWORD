import {knex} from "../database"
import { randomUUID } from "crypto";

export async function addToBlackList(token: string, userId: string) {
    await knex("revoked_tokens").insert({
        id: randomUUID(),
        token: token,
        user_id: userId,
        revoked_at: knex.fn.now()
    })
}
export async function isTokenRevoked(token: string){
    const revokedToken = await knex("revoked_tokens").where({ token }).first();
    return !!revokedToken;
}