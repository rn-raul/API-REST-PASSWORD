import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      nome: string;
      email: string;
      password_hash: string;
      created_at: string;
      updated_at: string;
    };
    passwords: {
      id: string;
      user_id: string;
      service: string;
      password_hash: string;
      notes: string | null;
      created_at: string;
      updated_at: string;
    };
    revoked_tokens: {
      id: string;
      token: string;
      user_id: string;
      revoked_at: string;
    };
  }
}
