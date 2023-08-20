import { Connection, connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const defaultDB = connect(config);

const select =
  "SELECT quotes.id, quotes.quote, quotes.author_id, authors.first_name, authors.last_name, authors.image_url ";
const from = "FROM quotes JOIN authors ON quotes.author_id = authors.id";

export class Database {
  private connection: Connection;
  constructor(db: Connection = defaultDB) {
    this.connection = db;
  }

  async findQuoteByText(quote: string): Promise<QuoteWithAuthor | null> {
    const results = await this.connection.execute(
      `${select} ${from} WHERE is_active=1 AND quote=? `,
      [quote]
    );

    return (results.rows?.[0] as QuoteWithAuthor) ?? null;
  }

  async findQuoteById(id: string | number): Promise<QuoteWithAuthor | null> {
    const results = await this.connection.execute(
      `${select} ${from} WHERE is_active=1 AND quotes.id=? `,
      [id]
    );
    return (results.rows?.[0] as QuoteWithAuthor) ?? null;
  }

  async findAuthorQuoteCount(author_id: string): Promise<number> {
    const results = await this.connection.execute(
      `SELECT COUNT(*) as count from quotes where is_active=1 AND author_id=? `,
      [author_id]
    );

    // Cast the row to the expected type
    const countRow = results.rows?.[0] as {
      count: number;
    };

    return countRow?.count ?? 0;
  }

  async insertQuote({
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
    const results = await this.connection.transaction(async (tx) => {
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

  async findRandomQuoteByAuthorId(
    author_id: string | number,
    quote_id?: string | number
  ): Promise<{ id: string } | null> {
    const results = await this.connection.execute(
      `SELECT quotes.id ${from} WHERE is_active=1 AND author_id=? AND NOT quotes.id=? ORDER BY RAND() LIMIT 1`,
      [author_id, quote_id]
    );

    return (results.rows?.[0] as unknown as { id: string }) ?? null;
  }

  async findRandomQuote({
    quote_id,
  }: {
    quote_id: string;
  }): Promise<{ id: string } | null> {
    const results = await this.connection.execute(
      `SELECT quotes.id ${from} WHERE is_active=1 AND NOT quotes.id=? ORDER BY RAND() LIMIT 1`,
      [quote_id]
    );

    return (results.rows?.[0] as QuoteWithAuthor) ?? null;
  }
}
