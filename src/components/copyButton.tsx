"use client";
import * as React from "react";
import clsx from "clsx";

export function CopyButton({
  quote_id,
  children,
}: {
  quote_id: string;
  children: React.ReactNode;
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/${quote_id}`)
      .then(() => {
        setIsCopied(true);
        // Revert back to original text after 1.5 seconds
        setTimeout(() => setIsCopied(false), 1500);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  return (
    <button
      className={clsx(
        "m-2 p-1 rounded-lg transition-colors",
        "text-sm sm:text-md font-crimson-text text-secondary hover:text-primary",
        "focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
      )}
      onClick={copyToClipboard}
    >
      {isCopied ? "Link copied!" : children}
    </button>
  );
}
