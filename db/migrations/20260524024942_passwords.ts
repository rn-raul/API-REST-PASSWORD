import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('passwords', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('service').notNullable();
        table.string('password_hash').notNullable();
        table.string('notes').nullable(); // Opcional para armazenar notas adicionais sobre a senha
        table.timestamps(true, true); // created_at e updated_at com timezone
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('passwords');
}

