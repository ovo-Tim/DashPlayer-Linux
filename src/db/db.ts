import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

const file = path.join(
    app?.getPath?.('userData') ?? __dirname,
    'useradd',
    'dp_db.sqlite3'
);
const isDev = process.env.NODE_ENV === 'development';
const sqlite = new Database(file);
const db = drizzle(sqlite, { logger: isDev });

export default db;