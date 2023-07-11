import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const url = "https://stoic-quotes-one.vercel.app/";

export async function handler(event) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Hello world!",
    }),
  };
  // const height = event.queryStringParameters.height || 1440;
  // const width = event.queryStringParameters.width || 2560;

  // const browser = await puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath(),
  //   headless: chromium.headless,
  //   ignoreHTTPSErrors: true,
  // });

  // const page = await browser.newPage();

  // await page.setViewport({
  //   width: Number(width),
  //   height: Number(height),
  // });

  // // Navigate to the url
  // await page.goto(url);

  // return {
  //   statusCode: 200,
  //   // Return as binary data
  //   isBase64Encoded: true,
  //   headers: { "Content-Type": "image/png" },
  //   body: await page.screenshot({ encoding: "base64" }),
  // };
}
