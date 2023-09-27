export function ensureNumber(
  value: string | null | undefined,
  defaultValue?: number
) {
  if (value === undefined || value === null) return defaultValue ?? undefined;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return defaultValue ?? undefined;
  return parsed;
}
