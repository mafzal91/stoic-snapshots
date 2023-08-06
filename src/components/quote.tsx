"use client";
import * as React from "react";

export function Quote({
  quote,
  author,
  fontSize,
}: {
  quote: string;
  author: string;
  fontSize: number;
}) {
  const quoteRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    function handleResize() {
      const quoteLength = quote.length;
      const baseFontSize = 50 - Math.sqrt(quoteLength);
      const fontSize = Math.max(baseFontSize - window.innerWidth / 1000, 12); // Set a minimum font size
      if (quoteRef.current) {
        quoteRef.current.style.fontSize = fontSize + "px";
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [quote]);

  return (
    <>
      <h3
        ref={quoteRef}
        style={{ fontSize, margin: "0 auto" }}
        className="font-eb-garamond text-primary"
      >
        {quote}
      </h3>
      <p className="py-4 text-base md:text-xl font-crimson-text text-secondary">
        {author}
      </p>
    </>
  );
}
