import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.timestamps(true, true);
    })
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

