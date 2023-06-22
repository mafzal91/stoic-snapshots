export function Quote({ quote, author }: { quote: string; author: string }) {
  return (
    <>
      <h3 className="text-3xl font-eb-garamond text-primary">{quote}</h3>
      <p className="py-4 text-xl font-crimson-text text-secondary">
        {/* <span className="mx-2 text-primary">&#x2022;</span> */}
        {author}
      </p>
    </>
  );
}
