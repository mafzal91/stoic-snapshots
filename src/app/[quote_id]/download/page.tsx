import { Metadata } from "next";

import { findQuoteById } from "@/utilities/database";
import { getFullName } from "@/utilities/get-full-name";

type Props = {
  params: {
    quote_id: string;
  };
};

export async function generateMetadata({
  params: { quote_id },
}: Props): Promise<Metadata> {
  const quoteData = await findQuoteById(quote_id);
  if (!quoteData) return {};

  const { first_name, last_name, quote } = quoteData;
  return {
    description: `${quote} - ${getFullName({ first_name, last_name })}`,
  };
}

export default async function DownloadQuoteByIdPage({
  params: { quote_id },
}: Props) {
  const quote = await fetch(
    `${process.env.HOSTNAME}/api/${quote_id}?quote_id=${quote_id}`
  );
  return <div>{quote_id}</div>;
}
