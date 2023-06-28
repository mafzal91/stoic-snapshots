export function Quote({ quote, author }: { quote: string; author: string }) {
  return (
    <>
      <h3 className="text-lg md:text-3xl font-eb-garamond text-primary">
        {quote}
      </h3>
      <p className="py-4 text-base md:text-xl font-crimson-text text-secondary">
        {author}
      </p>
    </>
  );
}
