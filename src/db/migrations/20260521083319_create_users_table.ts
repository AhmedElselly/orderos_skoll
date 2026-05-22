import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.raw(`
        create table users(
					id serial primary key,
					name varchar(255) not null,
					email varchar(255) not null unique,
					phone varchar(20) not null,
					password_hash varchar(255) not null,
					system_role varchar(50) not null check(system_role in ('customer', 'restaurant_user', 'system_admin')),
					created_at timestamp default now(),
					updated_at timestamp default now(),
					deleted_at timestamp nullable
        );
        create index idx_users_email on users(email);
				create index idx_users_system_role on users(system_role);
    `)
}


export async function down(knex: Knex): Promise<void> {
	await knex.raw(`
		drop table if exists users cascade;
	`)
}

