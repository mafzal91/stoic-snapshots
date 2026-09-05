import clsx from "clsx";

export function Quote({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  const isLongQuote = quote.length > 280;
  // Rem limits preserve text scaling; cqi follows the space inside the frame.
  const fontSizeClass = isLongQuote
    ? "text-[clamp(1.125rem,calc(0.85rem+2.4cqi),2rem)]"
    : quote.length > 100
      ? "text-[clamp(1.375rem,calc(1rem+2.5cqi),2.5rem)]"
      : "text-[clamp(1.5rem,calc(1rem+4cqi),3rem)]";

  return (
    <figure className="@container m-0 w-full">
      <blockquote
        className={clsx(
          "mx-auto font-eb-garamond text-primary [overflow-wrap:anywhere]",
          fontSizeClass,
          isLongQuote
            ? "max-w-[48ch] text-pretty leading-relaxed"
            : "max-w-[34ch] text-balance leading-[1.35]",
        )}
      >
        {quote}
      </blockquote>
      <figcaption className="mt-5 font-crimson-text text-base text-secondary [overflow-wrap:anywhere] sm:mt-6 sm:text-xl">
        {author}
      </figcaption>
    </figure>
  );
}
