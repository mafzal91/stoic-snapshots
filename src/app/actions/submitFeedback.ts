"use server";
import nodemailer from "nodemailer";

const to = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

export async function submitFeedback(formData: FormData) {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Set up the email transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: to,
      pass: password,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: email,
    to,
    subject: "Stoic Snapshot: New feedback",
    text: `From: ${email}\nMessage: ${message}`,
  });

  return;
}
