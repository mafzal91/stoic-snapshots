declare global {
  interface Window {
    grecaptcha: any;
  }
}

type Quote = {
  id: number;
  quote: string;
  author_id: number;
};

type Author = {
  id: number;
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
