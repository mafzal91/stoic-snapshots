import clsx from "clsx";
import Script from "next/script";
import { cookies } from "next/headers";
import "./globals.css";
import { Crimson_Text, EB_Garamond } from "next/font/google";
import { SelectMenu } from "@/components/selectMenu";
import { ColorScheme } from "@/app/common";
import { Border } from "@/components/border";

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
  title: "Stoic Wisdom",
  description: "A collection of quotes from the Stoics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = (cookies().get("color-scheme")?.value ??
    null) as ColorScheme | null;
  const colorSchemeClass = colorScheme
    ? `theme-${cookies().get("color-scheme")?.value}`
    : null;

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
                  for (let i = 0; i < classList.length; i++) {
                    if (classList[i].startsWith("theme-")) {
                      classList.remove("hidden");
                      observer.disconnect();  // stop observing once theme is set
                      break;
                    }
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
          <Border>
            <div className="flex w-full justify-end">
              <div className="w-full max-w-[12rem] p-4">
                <SelectMenu value={colorScheme} />
              </div>
            </div>
            <div className="flex flex-col flex-grow items-center">
              {children}
            </div>
          </Border>
        </main>
      </body>
    </html>
  );
}
