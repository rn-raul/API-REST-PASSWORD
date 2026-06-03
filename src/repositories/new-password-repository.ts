import {Tables} from "knex/types/tables";

export interface NewPasswordRepository {
    findManyByUserId(userId: string): Promise<Tables["passwords"][]>;
    create(data: {user_id: string; service: string; password_hash: string; notes?: string }): Promise<Tables["passwords"]>;
}