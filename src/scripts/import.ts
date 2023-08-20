import fs from "fs";
import path from "path";
import "dotenv/config";
import { Database } from "../utilities/database";
import { splitName } from "../utilities/split-name";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const db_connection = connect(config);

async function insertData() {
  const db = new Database(db_connection);
  try {
    // Read JSON file
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../../quotes2.json"),
      "utf8"
    );

    const data = JSON.parse(jsonData) as {
      quote: string;
      author: string;
      source: string;
    }[];

    // Loop through quotes and insert into the database
    for (const { quote, author, source } of data) {
      const { first_name, last_name } = splitName(author);
      console.log({
        quote,
        author,
      });
      if (quote) {
        await db.insertQuote({
          quote,
          first_name,
          last_name,
          raw: {
            quote,
            author,
            source,
          },
        });
      }
    }

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

insertData();
