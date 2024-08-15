/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:AVXftE7QFk2p@ep-silent-rain-a5t3uhin.us-east-2.aws.neon.tech/Mock-interview-ai?sslmode=require",
  },
};
