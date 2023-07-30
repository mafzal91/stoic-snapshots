export function splitName(name: string): {
  first_name: string;
  last_name: string;
} {
  const name_array = name.trim().split(" ");

  let first_name = "";
  let last_name = "";

  if (name_array.length > 0) {
    first_name = name_array[0];
  }

  if (name_array.length > 1) {
    last_name = name_array.slice(1).join(" ");
  }

  return { first_name, last_name };
}
