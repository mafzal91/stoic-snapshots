import crypto from "crypto";

export function calculateHashFromJSON(data: Record<string, any>) {
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(data));
  return hash.digest("hex");
}

export function isDuplicate(data: Quote, hash: string) {
  const newHash = calculateHashFromJSON(data);
  return newHash === hash;
}
