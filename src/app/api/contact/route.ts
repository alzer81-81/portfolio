import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || siteConfig.email;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Al Power Portfolio <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  try {
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email sending is not configured on the server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields before sending." },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (
      name.length > 120 ||
      email.length > 160 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long to send." },
        { status: 400 },
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111;">
        <h1 style="font-size: 24px; margin: 0 0 24px;">New portfolio contact message</h1>
        <p style="margin: 0 0 12px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 12px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    const text = [
      "New portfolio contact message",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "alpower-portfolio/1.0",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        html,
        text,
      }),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload?.message ||
            payload?.error?.message ||
            "The message could not be sent right now.",
        },
        { status: 502 },
      );
    }

    if (!payload?.id) {
      return NextResponse.json(
        { error: "The message could not be confirmed as sent." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: payload.id });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while sending." },
      { status: 500 },
    );
  }
}
