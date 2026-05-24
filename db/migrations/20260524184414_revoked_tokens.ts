import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("revoked_tokens", (table) => {
        table.uuid("id").primary();
        table.string("token").notNullable().unique();
        table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.timestamp("revoked_at").notNullable().defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("revoked_tokens");
}

