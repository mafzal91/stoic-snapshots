"use server";
import nodemailer from "nodemailer";

const to = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

async function verifyCaptchaToken(token: string) {
  const captchaURL = new URL("https://www.google.com/recaptcha/api/siteverify");
  captchaURL.searchParams.append(
    "secret",
    process.env.RECAPTCHA_SERVER_KEY as string
  );
  captchaURL.searchParams.append("response", token);

  const res = await fetch(captchaURL.toString());
  const data = await res.json();

  if (!data.success) return false;

  return data.score > 0.5;
}

export async function submitFeedback(formData: FormData) {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const isAllowed = await verifyCaptchaToken(token);
  if (!isAllowed) return false;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: to,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: email,
    to,
    subject: "Stoic Snapshots: New feedback",
    text: `From: ${email}\nMessage: ${message}`,
  });

  return;
}
