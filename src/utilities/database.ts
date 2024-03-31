import { DB as DbTypes } from "@/db/types";
import { sql } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";
import { generateId } from "@/utilities/generate-id";

export const defaultDb = createKysely<DbTypes>({
  connectionString: `${process.env.PG_DATABASE_URL}?-pooler.`,
});

export class Database {
  private connection;
  constructor(db = defaultDb) {
    this.connection = db;
  }

  async findQuoteById(id: number): Promise<QuoteWithAuthor | null> {
    const results = await this.connection
      .selectFrom(["quotes"])
      .innerJoin("authors", "quotes.author_id", "authors.id")
      .select([
        "quotes.id",
        "quotes.quote",
        "quotes.author_id",
        "authors.first_name",
        "authors.last_name",
        "authors.image_url",
      ])
      .where("quotes.is_active", "=", true)
      .where("quotes.id", "=", id)
      .execute();

    return results?.[0] ?? null;
  }

  async findAuthorById(id: number): Promise<Author | null> {
    const results = await this.connection
      .selectFrom("authors")
      .select([
        "authors.id",
        "authors.first_name",
        "authors.last_name",
        "authors.image_url",
      ])
      .where("authors.id", "=", id)
      .execute();

    return (results?.[0] as Author) ?? null;
  }

  async findAuthorQuoteCount(author_id: number): Promise<number> {
    const results = await this.connection
      .selectFrom("quotes")
      .select(({ fn }) => [fn.count<number>("quotes.id").as("count")])
      .where("is_active", "=", true)
      .where("author_id", "=", author_id)
      .execute();

    // for some reason count is returned as a string eventhough its typed as a number. So im explicitly casting it to a number
    return Number(results[0].count ?? 0);
  }

  async findRandomQuoteByAuthorId(
    author_id: number,
    quote_id?: number
  ): Promise<{ id: number } | null> {
    const results = await this.connection
      .selectFrom("quotes")
      .select("id")
      .where("is_active", "=", true)
      .where("author_id", "=", author_id)
      .$if(!!quote_id, (q) => q.where("id", "!=", quote_id!))
      .orderBy(sql`RANDOM()`)
      .limit(1)
      .execute();

    return results?.[0] ?? null;
  }

  async findRandomQuote({
    quote_id,
  }: {
    quote_id?: number;
  }): Promise<{ id: number }> {
    if (!quote_id) {
      const results = await this.connection
        .selectFrom("quotes")
        .select("id")
        .where("is_active", "=", true)
        .orderBy(sql`RANDOM()`)
        .limit(1)
        .execute();

      return results?.[0];
    }

    const results = await this.connection
      .selectFrom("quotes")
      .select("id")
      .where("is_active", "=", true)
      .where("id", "!=", quote_id)
      .orderBy(sql`RANDOM()`)
      .limit(1)
      .execute();
    return results?.[0];
  }

  async findQuotes({
    filters,
    offset,
    limit,
  }: {
    filters?: {
      author_id?: number;
    };
    offset?: number;
    limit?: number;
  }): Promise<QuoteWithAuthor[]> {
    const results = await this.connection
      .selectFrom(["quotes"])
      .innerJoin("authors", "quotes.author_id", "authors.id")
      .select([
        "quotes.id",
        "quotes.quote",
        "quotes.author_id",
        "authors.first_name",
        "authors.last_name",
        "authors.image_url",
      ])
      .where("quotes.is_active", "=", true)
      .$if(!!filters?.author_id, (q) =>
        q.where("quotes.author_id", "=", filters?.author_id!)
      )
      .orderBy("quotes.id", "asc")
      .$if(offset !== undefined, (q) => q.offset(offset!))
      .$if(limit !== undefined, (q) => q.limit(limit!))
      .execute();

    return results;
  }

  async countQuotes({
    filters,
  }: {
    filters?: {
      author_id?: number;
    };
  }): Promise<number> {
    const results = await this.connection
      .selectFrom("quotes")
      .select(({ fn }) => [fn.count<number>("id").as("count")])
      .where("is_active", "=", true)
      .$if(!!filters?.author_id, (q) =>
        q.where("quotes.author_id", "=", filters?.author_id!)
      )
      .execute();

    // for some reason count is returned as a string eventhough its typed as a number. So im explicitly casting it to a number
    return Number(results[0].count ?? 0);
  }

  async findAuthors({
    offset,
    limit,
  }: {
    offset?: number;
    limit?: number;
  }): Promise<Author[]> {
    const results = await this.connection
      .selectFrom("authors")
      .select(["first_name", "last_name", "image_url", "id"])
      .$if(offset !== undefined, (q) => q.offset(offset!))
      .$if(limit !== undefined, (q) => q.limit(limit!))
      .execute();

    return results;
  }

  async countAuthors(): Promise<number> {
    const results = await this.connection
      .selectFrom("authors")
      .select(({ fn }) => [fn.count<number>("authors.id").as("count")])
      .execute();

    // for some reason count is returned as a string eventhough its typed as a number. So im explicitly casting it to a number
    return Number(results[0].count ?? 0);
  }

  async toggleLike({
    color_scheme,
    is_liked,
  }: {
    color_scheme: string;
    is_liked: boolean;
  }): Promise<void> {
    await this.connection
      .updateTable("themes")
      .set((eb) => ({
        likes: eb("likes", is_liked ? "+" : "-", 1),
      }))
      .where("name", "=", color_scheme)
      .execute();
    return;
  }

  async saveDownloadSettings({
    quote_id,
    color_scheme,
    border,
    image_preset,
    width,
    height,
  }: {
    quote_id: number;
    color_scheme?: string;
    border?: string;
    image_preset?: string;
    width?: number;
    height?: number;
  }): Promise<void> {
    const event_id = generateId();

    const settingsMap = {
      color_scheme,
      border,
      image_preset,
      width,
      height,
    };

    let inserts = Object.entries(settingsMap).filter(([key, value]) => value);

    if (inserts.length === 0) {
      return;
    }
    this.connection
      .insertInto("download_settings")
      .values(
        inserts.map(([key, value]) => ({
          event_id,
          setting: key,
          value: `${value}`,
          quote_id,
        }))
      )
      .execute();
    return;
  }
}
