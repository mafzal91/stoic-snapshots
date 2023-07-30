"use client";
import * as React from "react";
import { FooterButton } from "@/components/footerButton";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Loader() {
  return (
    <div className={"m-2 mx-2 p-1 flex"}>
      <div
        className={`m-0 text-sm sm:text-md text-secondary animate-bounce`}
        style={{ animationDelay: ".1s" }}
      >
        •
      </div>
      <div
        className={`m-0 text-sm sm:text-md text-secondary animate-bounce`}
        style={{ animationDelay: ".2s" }}
      >
        •
      </div>
      <div
        className={`m-0 text-sm sm:text-md text-secondary animate-bounce`}
        style={{ animationDelay: ".3s" }}
      >
        •
      </div>
    </div>
  );
}

export function DownloadButton({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await fetch(url).finally(() => setIsLoading(false));
  };

  if (isLoading) return <Loader />;
  return <FooterButton onClick={handleClick}>{children}</FooterButton>;
}
