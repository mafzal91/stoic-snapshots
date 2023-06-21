import Image from "next/image";
import Link from "next/link";
import { findQuoteByText, insertQuote, findQuoteById } from "../database";

async function getQuote(quoteId: string): Promise<QuoteWithAuthor> {
  return findQuoteById(quoteId) as QuoteWithAuthor;
}

export default async function QuoteByIdPage({
  params: { quoteId },
}: {
  params: { quoteId: string };
}) {
  const quote = await getQuote(quoteId);

  const authorName = quote.first_name
    ? `${quote.first_name} ${quote.last_name ?? ""}`
    : "Unknown";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-gray-900 dark:bg-blue-gray-900">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>

      <div className="relative flex place-items-center">
        {/* before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"> */}
        <div className="w-60 h-60 rounded-full border border-primary">
          <div className="h-full w-full absolute bottom-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        {/* Put image of philosopher here */}
      </div>
      <div className="container mx-auto sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-josefin-sans text-primary">
          {quote.quote}
        </h3>
        <span className="text-xl font-crimson-text text-secondary">
          - {authorName}
        </span>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>
      </div>
    </main>
  );
}
