export default () => ({
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  DATABASE_USER: process.env.DATABASE_USER || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
  DATABASE_DB: process.env.DATABASE_DB || 'postgres',
  DATABASE_MIGRATION_ENABLED: JSON.parse(
    process.env.DATABASE_MIGRATION_ENABLED,
  ),
  JWT_SECRET: process.env.JWT_SECRET,
});
