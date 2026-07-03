import pg from "pg";
const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

await client.query(`
  CREATE TABLE IF NOT EXISTS public.ice_breakers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id bigint NOT NULL REFERENCES public.users(id),
    question text NOT NULL,
    response text NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("ice_breakers table created");
await client.end();
