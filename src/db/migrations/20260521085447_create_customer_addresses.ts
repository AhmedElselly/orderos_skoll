import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        create table customer_addresses(
            id serial primary key,
            user_id bigint not null,
            label text not null,
            lng decimal(10, 6) not null,
            lat decimal(10, 6) not null
            is_default boolean default false,
            created_at timestamp default now(),
            updated_at timestamp default now(),

            constraints fk_customer_addresses_user_id foreign key (user_id) references users(id) on delete cascade
        );
        create index idx_customer_addresses_user_id on customer_addresses(user_id);`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table if exists customer_addresses;
    `)
}

