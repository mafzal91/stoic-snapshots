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
import { About } from "./about";

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
const getCookieSettings = () => {
  let border = true;

  const cookieBorder = cookies().get("border")?.value;
  border = JSON.parse(cookieBorder ?? "true");

  const colorScheme = (cookies().get("colorScheme")?.value ??
    null) as ColorScheme | null;

  const imagePreset = (cookies().get("imagePreset")?.value ??
    ImagePresets.Screen) as ImagePresets;

  const dimensions = {
    width: parseInt(cookies().get("width")?.value ?? "0"),
    height: parseInt(cookies().get("height")?.value ?? "0"),
  };

  const likedThemes: Record<string, boolean> = JSON.parse(
    cookies().get("likedThemes")?.value ?? "{}"
  );

  return { colorScheme, border, imagePreset, dimensions, likedThemes };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieValues = getCookieSettings();
  const { border, colorScheme, imagePreset, likedThemes } = cookieValues;
  const colorSchemeClass = colorScheme ? `theme-${colorScheme}` : null;

  return (
    <html lang="en">
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
          "bg-background",
          clsx(colorSchemeClass ?? "hidden")
        )}
      >
        <main className="flex min-h-screen flex-col p-4">
          <Border enabled={border}>
            <div className="flex w-full p-4 justify-between screenshot-hidden">
              {/* <div className="p-4 flex"> */}
              {/* <About /> */}
              <Feedback />
              <Settings
                initialSettings={{
                  colorScheme,
                  border,
                  imagePreset,
                  likedThemes,
                }}
              />
              {/* </div> */}
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
