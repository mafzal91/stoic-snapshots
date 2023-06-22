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
        "group m-2 p-2 rounded-lg transition-colors",
        "m-0 text-md opacity-50 font-crimson-text text-secondary hover:text-primary"
      )}
      onClick={copyToClipboard}
    >
      {isCopied ? "Copied!" : children}
    </button>
  );
}
