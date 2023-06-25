import clsx from "clsx";
import Script from "next/script";
import { cookies } from "next/headers";
import "./globals.css";
import { Crimson_Text, EB_Garamond } from "next/font/google";
import { SelectMenu } from "@/components/selectMenu";

const crimson_text = Crimson_Text({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-crimson-text",
});

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-eb-garamond",
});

export const metadata = {
  title: "Stoic Quotes",
  description: "A collection of quotes from the Stoics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = cookies().get("color-scheme")?.value ?? null;
  const colorSchemeClass = colorScheme
    ? `theme-${cookies().get("color-scheme")?.value}`
    : null;

  console.log({ colorScheme, colorSchemeClass });
  return (
    <html lang="en">
      <head>
        <Script id="set-color-theme" strategy="beforeInteractive">
          {`(function() {
            // Create a new observer
            const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                  const classList = mutation.target.classList;
                  if (classList.contains("theme-dark") || classList.contains("theme-light")) {
                    classList.remove("hidden");
                    observer.disconnect();  // stop observing once theme is set
                  }
                }
              });
            });

            // Start observing the body for attribute changes
            observer.observe(document.body, { attributes: true });
            
          })()`}
        </Script>
      </head>
      <body
        className={clsx(
          crimson_text.variable,
          eb_garamond.variable,
          "bg-background",
          clsx(colorSchemeClass ?? "hidden")
        )}
      >
        <main className="flex min-h-screen flex-col p-4">
          <div className="flex w-full">
            <SelectMenu value={colorScheme} />
          </div>
          <div className="flex flex-col flex-grow items-center">{children}</div>
        </main>
      </body>
    </html>
  );
}
