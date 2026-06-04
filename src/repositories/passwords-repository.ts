import {Tables} from "knex/types/tables";

export interface PasswordsRepository {
    update(
        id: string, 
        userId: string, 
        data: { service?: string; password_hash?: string; notes?: string | null }
    ): Promise<void>;
    findById(id: string, userId: string): Promise<Tables["passwords"] | undefined>;
    deleteById(id: string, userId: string): Promise<boolean>;
    findManyByUserId(userId: string): Promise<Tables["passwords"][]>;
    create(data: {user_id: string; service: string; password_hash: string; notes?: string }): Promise<Tables["passwords"]>;
}