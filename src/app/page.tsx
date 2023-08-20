import { Database } from "@/utilities/database";
import { redirect } from "next/navigation";

async function getRandomQuote(): Promise<{ id: string }> {
  return new Database().findRandomQuote({});
}

export default async function Home() {
  const quote = await getRandomQuote();

  redirect(`/${quote.id}`);
}
