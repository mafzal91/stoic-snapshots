type Quote = {
  id: string;
  quote: string;
  author_id: string;
};

type Author = {
  id: string;
  first_name: string;
  last_name: string | null;
  image_url: string | null;
};

type QuoteWithAuthor = Quote & Omit<Author, "id">;

type ApiResponse = {
  quote: string;
  author: string;
};

type ImageDimensions = { width: number; height: number };
