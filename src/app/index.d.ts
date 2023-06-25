enum ColorScheme {
  Dark = "dark",
  Light = "light",
}

type Quote = {
  id: string;
  quote: string;
  author_id: string;
};

type Author = {
  id: string;
  first_name: string;
  last_name: string | null;
};

type QuoteWithAuthor = Quote & Omit<Author, "id">;

type ApiResponse = {
  quote: string;
  author: string;
};
