function modifyPayload(payload: ApiResponse): ApiResponse {
  // Check if the quote ends with '@'
  if (payload.quote.endsWith("@")) {
    // Append '@' to the author's name and remove it from the quote
    payload.author += "@";
    payload.quote = payload.quote.slice(0, -1);
  }

  // Convert the modified JSON object back into a string
  return payload;
}

export async function getStoicQuote() {
  const response = await fetch("https://api.themotivate365.com/stoic-quote", {
    cache: "no-store",
  });

  let data: ApiResponse = await response.json();
  data = modifyPayload(data);
  data.quote = data.quote.trimEnd();

  return data;
}
