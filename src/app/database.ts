import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const db = connect(config);

export async function findQuoteByText(
  quote: string
): Promise<QuoteWithAuthor | null> {
  const results = await db.execute(
    "SELECT quotes.id, quotes.quote, authors.first_name, authors.last_name FROM quotes JOIN authors ON quotes.author_id = authors.id WHERE quote=? ",
    [quote]
  );

  return (results.rows?.[0] as QuoteWithAuthor) ?? null;
}

export async function findQuoteById(
  id: string | number
): Promise<QuoteWithAuthor | null> {
  const results = await db.execute(
    "SELECT quotes.id, quotes.quote, quotes.author_id, authors.first_name, authors.last_name FROM quotes JOIN authors ON quotes.author_id = authors.id WHERE quotes.id=? ",
    [id]
  );

  return (results.rows?.[0] as QuoteWithAuthor) ?? null;
}

export async function insertQuote({
  quote,
  first_name,
  last_name,
  raw,
}: {
  quote: string;
  first_name: string;
  last_name: string | null;
  raw: Record<string, any>;
}) {
  const results = await db.transaction(async (tx) => {
    // Try to find the author by their name to get the author_id
    const {
      rows: [author = null],
    } = await tx.execute(
      "select * from authors where first_name=? and last_name=?",
      [first_name, last_name]
    );

    const selectedAuthor = author as Author | null;

    let author_id = null;
    if (selectedAuthor) {
      author_id = selectedAuthor.id;
    } else {
      const { insertId: new_author_id } = await tx.execute(
        "insert into authors (first_name, last_name) values (?, ?)",
        [first_name, last_name]
      );
      author_id = new_author_id;
    }
    const { insertId } = await tx.execute(
      "INSERT INTO quotes (quote, author_id, raw) VALUES (?, ?, ?)",
      [quote, author_id, JSON.stringify(raw)]
    );
    return insertId;
  });

  return results;
}
