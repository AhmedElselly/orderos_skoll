import type { Knex } from "knex";
import { env } from "../config/env";

const knexConfig: Knex.Config = {
    client: "pg",
    connection: {
        host: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.name,
    },
    pool: {
        min: 2,
        max: env.db.poolMax,
    },
    migrations: {
        directory: env.db.migrationsDir,
        extension: env.db.migrationsExt,
    },
};

export default knexConfig