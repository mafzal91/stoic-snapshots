import clsx from "clsx";
import Script from "next/script";
import { cookies } from "next/headers";
import { Partytown } from "@builder.io/partytown/react";

import "./globals.css";
import { Crimson_Text, EB_Garamond } from "next/font/google";
import { ColorScheme, ImagePresets } from "@/app/common";
import { Border } from "@/components/border";
import { Settings } from "./settings";
import { Feedback } from "./feedback";

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
  title: "Stoic Snapshots",
  description: "A collection of quotes from the Stoics",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg" },
    shortcut: { url: "/favicon.svg", type: "image/svg" },
  },
};
const getCookieSettings = async () => {
  let border = true;

  const cookieStore = await cookies();
  const cookieBorder = cookieStore.get("border")?.value;
  border = JSON.parse(cookieBorder ?? "true");

  const colorScheme = (cookieStore.get("colorScheme")?.value ??
    null) as ColorScheme | null;

  const imagePreset = (cookieStore.get("imagePreset")?.value ??
    ImagePresets.Screen) as ImagePresets;

  const dimensions = {
    width: parseInt(cookieStore.get("width")?.value ?? "0"),
    height: parseInt(cookieStore.get("height")?.value ?? "0"),
  };

  const likedThemes: Record<string, boolean> = JSON.parse(
    cookieStore.get("likedThemes")?.value ?? "{}"
  );

  return { colorScheme, border, imagePreset, dimensions, likedThemes };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieValues = await getCookieSettings();

  const { border, colorScheme, imagePreset, likedThemes } = cookieValues;

  return (
    <html lang="en" data-theme={colorScheme}>
      <head>
        <Partytown
          debug={process.env.NODE_ENV === "development"}
          forward={["dataLayer.push"]}
        />

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
        <Script
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-MYC1VRL2QJ"
        />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />

        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-MYC1VRL2QJ');
            `,
          }}
        />
      </head>
      <body
        className={clsx(
          crimson_text.variable,
          eb_garamond.variable,
          "bg-background"
        )}
      >
        <main className="flex min-h-screen flex-col p-4">
          <Border enabled={border}>
            <div className="flex w-full p-4 justify-between screenshot-hidden">
              <Feedback />
              <Settings
                initialSettings={{
                  colorScheme,
                  border,
                  imagePreset,
                  likedThemes,
                }}
              />
            </div>
            <div className="flex flex-col grow items-center">{children}</div>
          </Border>
        </main>
      </body>
    </html>
  );
}
