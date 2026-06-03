import {Tables} from "knex/types/tables";
export interface UsersRepository {
    findByEmail(email: string): Promise<Tables["users"] | undefined>;
    create(data: { nome: string; email: string; password_hash: string }): Promise<Tables["users"]>;
}