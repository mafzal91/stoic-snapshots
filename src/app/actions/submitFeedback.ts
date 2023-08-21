"use server";

export async function submitFeedback(formData: FormData) {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  return;
}
