export function getFullName({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string | null;
}) {
  const authorName = first_name
    ? `${first_name} ${last_name ?? ""}`
    : "Unknown";

  return authorName;
}
