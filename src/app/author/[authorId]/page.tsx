import Image from "next/image";
import Link from "next/link";
import { findQuoteByText, insertQuote, findQuoteById } from "../../database";

async function getQuote(authorId: string): Promise<QuoteWithAuthor> {
  return {} as QuoteWithAuthor;
}

export default async function Home({
  params: { authorId },
}: {
  params: { authorId: string };
}) {
  const quote = await getQuote(authorId);

  const authorName = quote.first_name
    ? `${quote.first_name} ${quote.last_name ?? ""}`
    : "Unknown";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-gray-900 dark:bg-blue-gray-900">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>

      {/*  */}
      <div>
        <div className="relative flex place-items-center">
          <div className="w-60 h-60 rounded-full border-2 border-primary">
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
      </div>
      {/*  */}

      <div className="mb-32 grid text-center justify-self-end lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
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
