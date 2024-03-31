import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type authors = {
    id: Generated<number>;
    first_name: string;
    last_name: string | null;
    image_url: string | null;
};
export type download_settings = {
    id: Generated<number>;
    event_id: string;
    setting: string;
    value: string | null;
    quote_id: number | null;
    created_at: Generated<Timestamp | null>;
};
export type quotes = {
    id: Generated<number>;
    quote: string;
    author_id: number;
    raw: unknown | null;
    is_active: Generated<boolean>;
    source: string | null;
};
export type themes = {
    id: Generated<number>;
    name: string;
    likes: number | null;
};
export type users = {
    id: Generated<number>;
    externalId: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password: string;
    createdAt: Generated<Timestamp | null>;
};
export type DB = {
    authors: authors;
    download_settings: download_settings;
    quotes: quotes;
    themes: themes;
    users: users;
};
