import { Pool } from "pg";
import config from "../../../config/index";

const globalPg = globalThis as unknown as { pgPool?: Pool };

export const pgPool =
  globalPg.pgPool ||
  new Pool({
    connectionString: config.database.URL,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalPg.pgPool = pgPool;
