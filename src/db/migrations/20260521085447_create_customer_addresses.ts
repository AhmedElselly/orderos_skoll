import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        create table customer_addresses(
            id serial primary key,
            user_id bigint not null,
            label text not null,
            city text not null,
            country text not null,
            street text not null,
            building text,
            apartment_number text not null,
            type text not null check (type in ('office', 'home', 'public_place')),
            lng decimal(10, 7) not null,
            lat decimal(10, 7) not null,
            is_default boolean default false,
            created_at timestamp default now(),
            updated_at timestamp default now(),

            constraint fk_customer_addresses_user_id foreign key (user_id) references users(id) on delete cascade
        );
        create index idx_customer_addresses_user_id on customer_addresses(user_id);`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table if exists customer_addresses;
    `)
}

