import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Database } from "@/utilities/database";
import { getFullName } from "@/utilities/get-full-name";
import { Quote } from "@/components/quote";
import { FooterLink } from "@/components/footerLink";
import { Divider } from "@/components/divider";
import { CopyButton } from "@/components/copyButton";
import { HeartIcon } from "@heroicons/react/24/solid";

type Props = {
  params: Promise<{
    quote_id: string;
  }>;
};

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const quotes: QuoteWithAuthor[] = await new Database().findQuotes({
    filters: {},
  });
  const quoteIds = quotes
    .filter((quote) => quote.id !== 500)
    .map((quote) => ({ quote_id: String(quote.id) }));
  return quoteIds;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { quote_id } = params;

  const quoteData = await new Database().findQuoteById(Number(quote_id));
  if (!quoteData) return {};

  const { first_name, last_name, quote } = quoteData;
  return {
    description: `${quote} - ${getFullName({ first_name, last_name })}`,
  };
}

async function getQuote(
  quote_id: string
): Promise<(QuoteWithAuthor & { count: number }) | null> {
  const db = new Database();
  const quote = await db.findQuoteById(Number(quote_id));
  if (!quote) return null;
  const count = await db.findAuthorQuoteCount(quote.author_id);
  return { ...quote, count };
}

export default async function QuoteByIdPage(props: Props) {
  const params = await props.params;

  const { quote_id } = params;

  const quoteData = await getQuote(quote_id);

  if (!quoteData) notFound();

  const { count, ...quote } = quoteData;

  const authorName = quote.first_name
    ? `${quote.first_name} ${quote.last_name ?? ""}`
    : "Unknown";

  return (
    <>
      <div className="flex w-full min-w-0 grow flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-5xl px-2 py-6 text-center sm:px-6 sm:py-8 lg:px-8">
          <Quote quote={quote.quote} author={authorName} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center lg:mb-0 lg:text-left screenshot-hidden">
        <FooterLink href={`/random?quote_id=${quote.id}`}>Random</FooterLink>
        {authorName !== "Unknown" && count > 1 && (
          <>
            <Divider />
            <FooterLink
              href={`/author/${quote.author_id}?quote_id=${quote.id}`}
            >
              More from {authorName}
            </FooterLink>
          </>
        )}
        <Divider />
        <CopyButton quote_id={quote.id}>Share this quote</CopyButton>
        <Divider />
        <FooterLink
          href={"https://www.buymeacoffee.com/mafzal91"}
          target="_blank"
          rel="noopener"
        >
          Buy me a coffee
        </FooterLink>
        <Divider />
        <FooterLink href={"https://mafz.al"} target="_blank" rel="noopener">
          By Mo with{" "}
          <HeartIcon className="inline align-sub h-4 w-4 text-primary" />
        </FooterLink>
      </div>
    </>
  );
}
