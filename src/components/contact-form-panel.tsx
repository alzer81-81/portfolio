"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/seo";

export function ContactFormPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  if (status === "sent") {
    return (
      <div className="contact-page__thankyou" role="status" aria-live="polite">
        <p className="contact-page__thankyou-eyebrow">Message Sent</p>
        <h2>Thanks. Your details have been sent.</h2>
        <p>
          I&apos;ll take a look and follow up at <strong>{siteConfig.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      className="contact-page__form"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("sending");
        setStatusMessage("");

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              subject,
              message,
            }),
          });

          const payload = await response.json().catch(() => null);

          if (!response.ok) {
            throw new Error(payload?.error || "Something went wrong while sending.");
          }

          setStatus("sent");
          setStatusMessage("Thanks. Your details have been sent.");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        } catch (error) {
          setStatus("error");
          setStatusMessage(
            error instanceof Error
              ? error.message
              : "Something went wrong while sending.",
          );
        }
      }}
    >
      <div className="contact-page__form-header">
        <h2>Send your details.</h2>
        <p>
          Share the basics and I&apos;ll follow up from there. A short outline is
          plenty.
        </p>
      </div>

      <div className="contact-page__form-grid">
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            required
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            required
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      <label>
        Subject
        <input
          type="text"
          name="subject"
          placeholder="What are we talking about?"
          value={subject}
          required
          autoComplete="on"
          onChange={(event) => setSubject(event.target.value)}
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows={8}
          placeholder="Tell me a bit about the project, timeline, or what you need help with."
          value={message}
          required
          autoComplete="on"
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>

      <div className="contact-page__form-actions">
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </div>

      {statusMessage && status === "error" ? (
        <p
          className={`contact-page__form-status contact-page__form-status--${status}`}
          role={status === "error" ? "alert" : "status"}
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
