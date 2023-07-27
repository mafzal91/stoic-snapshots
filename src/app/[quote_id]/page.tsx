import clsx from "clsx";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { findQuoteById } from "@/app/database";
import { getFullName } from "@/app/get-full-name";
import { Circle } from "@/components/circle";
import { Quote } from "@/components/quote";
import { FooterLink } from "@/components/footerItem";
import { Divider } from "@/components/divider";
import { CopyButton } from "@/components/copyButton";

type Props = {
  params: {
    quote_id: string;
  };
};

export async function generateMetadata({
  params: { quote_id },
}: Props): Promise<Metadata> {
  const quoteData = await findQuoteById(quote_id);
  if (!quoteData) return {};

  const { first_name, last_name, quote } = quoteData;
  return {
    description: `${quote} - ${getFullName({ first_name, last_name })}`,
  };
}

async function getQuote(quote_id: string): Promise<QuoteWithAuthor | null> {
  return findQuoteById(quote_id);
}

export default async function QuoteByIdPage({ params: { quote_id } }: Props) {
  const quote = await getQuote(quote_id);

  if (!quote) notFound();

  const authorName = quote.first_name
    ? `${quote.first_name} ${quote.last_name ?? ""}`
    : "Unknown";

  return (
    <>
      <div className="flex flex-col flex-grow justify-center items-center">
        {/* {quote.image_url && (
          <div className="relative">
            <Circle />

            <div className="absolute w-full top-0 bottom-0 flex items-center justify-center">
              <Image
                className={clsx(
                  "w-48 h-48 sm:w-56 sm:h-56 md:w-96 md:h-96 rounded-full"
                )}
                src={quote.image_url}
                width={256}
                height={256}
                alt={authorName}
              />
              <div className="absolute rounded-full inset-0 mix-blend-color bg-accent"></div>
            </div>
          </div>
        )} */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Quote quote={quote.quote} author={authorName} />
        </div>
      </div>

      {/*  */}

      <div className="flex items-center lg:mb-0 lg:text-left screenshot-hidden">
        <Divider />
        <FooterLink
          href={{
            pathname: "/random",
            query: { quote_id: quote.id },
          }}
        >
          Random
        </FooterLink>
        {authorName !== "Unknown" && (
          <>
            <Divider />
            <FooterLink
              href={{
                pathname: `/author/${quote.author_id}`,
                query: { quote_id: quote.id },
              }}
            >
              More from {authorName}
            </FooterLink>
          </>
        )}
        <Divider />
        <CopyButton quote_id={quote.id}>Share this quote</CopyButton>
        <Divider />
        <FooterLink
          target="_blank"
          href={{
            pathname: `/api/${quote.id}`,
          }}
        >
          Download as image
        </FooterLink>
      </div>
    </>
  );
}
