import mysql from "mysql2/promise";
import pg from "pg";
const { Client } = pg;

import "dotenv/config";

async function importToPg() {
  try {
    const pgDb = new Client({
      connectionString: process.env.PG_DATABASE_URL,
    });
    await pgDb.connect();

    const mysqlDb = await mysql.createConnection(
      process.env.MYSQL_DATABASE_URL
    );

    await pgDb.query("TRUNCATE TABLE download_settings CASCADE");
    await pgDb.query("TRUNCATE TABLE quotes CASCADE");
    await pgDb.query("TRUNCATE TABLE themes CASCADE");
    await pgDb.query("TRUNCATE TABLE authors CASCADE");

    await importAuthors(pgDb, mysqlDb);
    await importQuotes(pgDb, mysqlDb);
    await importDownloadSettings(pgDb, mysqlDb);
    await importThemes(pgDb, mysqlDb);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
}

importToPg();

const importAuthors = async (pgDb, mysqlDb) => {
  let [result] = await mysqlDb.query(
    "SELECT id, first_name, last_name, image_url FROM authors"
  );

  for (const row of result) {
    const insertQuery = {
      name: "insert-author",
      text: 'INSERT INTO "authors" ("id", "first_name", "last_name", "image_url") VALUES($1, $2, $3, $4)',
      values: Object.values(row),
    };
    await pgDb.query(insertQuery);
  }
};
const importDownloadSettings = async (pgDb, mysqlDb) => {
  let [result] = await mysqlDb.query(
    "SELECT id, event_id, setting, value, quote_id, created_at FROM download_settings"
  );
  for (const row of result) {
    const insertQuery = {
      name: "insert-download_settings",
      text: 'INSERT INTO "download_settings" ("id", "event_id", "setting", "value", "quote_id", "created_at") VALUES($1, $2, $3, $4, $5, $6)',
      values: Object.values(row),
    };
    await pgDb.query(insertQuery);
  }
};
const importQuotes = async (pgDb, mysqlDb) => {
  let [result] = await mysqlDb.query(
    "SELECT id, quote, author_id, raw, is_active, source FROM quotes"
  );

  result.forEach((quote) => {
    quote.is_active = Boolean(quote.is_active);
    quote.raw = JSON.stringify(quote);
  });

  for (const row of result) {
    const insertQuery = {
      name: "insert-quote",
      text: 'INSERT INTO "quotes" ("id", "quote", "author_id", "raw", "is_active", "source") VALUES($1, $2, $3, $4, $5, $6)',
      values: Object.values(row),
    };
    await pgDb.query(insertQuery);
  }
};
const importThemes = async (pgDb, mysqlDb) => {
  let [result] = await mysqlDb.query(
    "SELECT id, name, likes source FROM themes"
  );
  for (const row of result) {
    const insertQuery = {
      name: "insert-theme",
      text: 'INSERT INTO "themes" ("id", "name", "likes") VALUES($1, $2, $3)',
      values: Object.values(row),
    };
    await pgDb.query(insertQuery);
  }
};
