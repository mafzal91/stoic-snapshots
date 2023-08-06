"use client";
import * as React from "react";
import { FooterButton } from "@/components/footerButton";

function Loader() {
  return (
    <div className={"flex"}>
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

export function DownloadLink({
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
  return (
    <FooterButton onClick={handleClick}>
      <div className="m-2 mx-2 p-1">{children}</div>
    </FooterButton>
  );
}

export function DownloadButton({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const quote_id = window.location.pathname.split("/").pop();
    const base_url = window.location.origin;

    await fetch(`${base_url}/api/${quote_id}`).finally(() =>
      setIsLoading(false)
    );
  };

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const handleDownload = () => {
    const quote_id = window.location.pathname.split("/").pop();
    const base_url = window.location.origin;
    if (iframeRef.current) {
      iframeRef.current.src = `${base_url}/api/${quote_id}`;
      setIsLoading(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        className="inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-primary hover:text-background hover:bg-primary border-[1px] border-primary sm:ml-3 sm:w-auto"
        onClick={handleDownload}
      >
        {isLoading ? <Loader /> : children}
      </button>
      <iframe
        id="downloadFrame"
        ref={iframeRef}
        className="hidden"
        onLoad={handleLoad}
      />
    </>
  );
}
