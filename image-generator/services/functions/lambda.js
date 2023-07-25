import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const url = "https://stoic-quotes-one.vercel.app";
const YOUR_LOCAL_CHROMIUM_PATH =
  "/tmp/localChromium/chromium/mac_arm-1174617/chrome-mac/Chromium.app/Contents/MacOS/Chromium";

export async function handler(event) {
  // return {
  //   statusCode: 200,
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     message: "Hello world!",
  //   }),
  // };
  // const height = event.queryStringParameters.height || 1440;
  // const width = event.queryStringParameters.width || 2560;
  const height = 1080 ?? 1440;
  const width = 1080 ?? 2560;

  const launchArgs = {
    args: chromium.args,
    defaultViewport: {
      ...chromium.defaultViewport,
      deviceScaleFactor: 2,
      width: Number(width),
      height: Number(height),
    },
    executablePath: process.env.IS_LOCAL
      ? YOUR_LOCAL_CHROMIUM_PATH
      : await chromium.executablePath(),
    headless: true || chromium.headless,
    ignoreHTTPSErrors: true,
    slowMo: 200,
  };

  const browser = await puppeteer.launch(launchArgs);

  const page = await browser.newPage();

  // await page.setViewport({
  //   width: Number(width),
  //   height: Number(height),
  // });

  // Navigate to the url
  await page.goto(url);

  return {
    statusCode: 200,
    // Return as binary data
    isBase64Encoded: true,
    headers: { "Content-Type": "image/png" },
    body: await page.screenshot({ encoding: "base64" }),
  };
}
