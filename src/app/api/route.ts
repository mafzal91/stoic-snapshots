import { NextResponse } from "next/server";
// import playwright from "playwright-aws-lambda";
import edgeChromium from "chrome-aws-lambda";

import puppeteer from "puppeteer-core";
const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function GET() {
  // Edge executable will return an empty string locally.
  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://github.com");
  const screenshotBuffer = await page.screenshot();
  await browser.close();

  const response = new NextResponse(screenshotBuffer.toString("base64"));
  response.headers.set("Content-Type", "image/png");
  response.headers.set("Content-Length", screenshotBuffer.length.toString());
  return response;
}
