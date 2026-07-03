import { readFileSync, readdirSync, statSync } from "fs";
import { join, parse } from "path";
import pg from "pg";

const { Client } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const client = new Client({ connectionString });

async function runMigrations() {
  await client.connect();
  console.log("Connected to Supabase Postgres");

  // Ordered migration files
  const migrationDirs = [
    "scripts",
    "migrations",
  ];

  const fileOrder = [
    // First, the main schema files in order
    "01-create-tables.sql",
    "db",  // root db file (canonical schema with extra columns)
    "02-add-media-selection.sql",
    "03-add-media-cache.sql",
    // Storage buckets
    "05-create-media-bucket.sql",
    "08-fix-storage-permissions.sql",
    // Scheduler
    "06-create-scheduler.sql",
    "04-content-rotator.sql",
    "05-storage-policies.sql",
    "06-fix_rls.sql",
    // Alterations
    "07-add-thumbnail-column.sql",
    "08-add-groq-auto-reply.sql",
    "09-add-ai-context.sql",
    "add_trigger_source.sql",
    "10-add-avatar-url.sql",
  ];

  for (const file of fileOrder) {
    let found = false;
    for (const dir of migrationDirs) {
      const filePath = join(process.cwd(), dir, file);
      try {
        const sql = readFileSync(filePath, "utf8");
        console.log(`Running ${dir}/${file}...`);
        await client.query(sql);
        console.log(`  ✓ ${dir}/${file}`);
        found = true;
        break;
      } catch (e) {
        if (e.code === "ENOENT") continue;
        // SQL error - log but continue
        console.error(`  ✗ ${dir}/${file}: ${e.message}`);
        found = true;
        break;
      }
    }
    // Also check root for 'db' file
    if (!found) {
      const rootPath = join(process.cwd(), file);
      try {
        const sql = readFileSync(rootPath, "utf8");
        console.log(`Running ${file}...`);
        await client.query(sql);
        console.log(`  ✓ ${file}`);
      } catch (e) {
        if (e.code !== "ENOENT") {
          console.error(`  ✗ ${file}: ${e.message}`);
        } else {
          console.log(`  - ${file} not found, skipping`);
        }
      }
    }
  }

  console.log("\nMigrations complete!");
  await client.end();
}

runMigrations().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
