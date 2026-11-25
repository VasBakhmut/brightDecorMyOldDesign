import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, createRateLimiter, enquiryText } from "@/lib/contact";
import { allowsContactOrigin } from "@/lib/contact-origin";
export const runtime = "nodejs";
const allow = createRateLimiter();
const fallback =
  "Please call Max on 0420 750 595 or email max@brightdecor.com.au to arrange your quote.";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const localOrigin = new URL(request.url);
  if (request.headers.get("host"))
    localOrigin.host = request.headers.get("host")!;
  if (!allowsContactOrigin(origin, localOrigin.origin))
    return NextResponse.json(
      { error: "This request could not be accepted." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Please send a valid enquiry." },
      { status: 415 },
    );
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip))
    return NextResponse.json(
      { error: `Too many requests. Please try again later. ${fallback}` },
      { status: 429, headers: { "Retry-After": "3600" } },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("No body");
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 20000) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Your message is too long." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json(
      { error: "Please check your enquiry and try again." },
      { status: 400 },
    );
  }
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim()
  )
    return NextResponse.json({ ok: true });
  const result = contactSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(
      {
        error:
          "Please check your name, email, phone, suburb and project details, and agree to be contacted.",
      },
      { status: 400 },
    );
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM)
    return NextResponse.json(
      { error: `Online enquiries are temporarily unavailable. ${fallback}` },
      { status: 503 },
    );
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  try {
    const sent = await transport.sendMail({
      from: SMTP_FROM,
      to: "max@brightdecor.com.au",
      replyTo: result.data.email,
      subject: `Website enquiry: ${result.data.service}`,
      text: enquiryText(result.data),
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    if (!sent.accepted?.length) throw new Error("Recipient not accepted");
    return NextResponse.json({ ok: true });
  } catch {
    console.error(
      "Contact email delivery failed. Check SMTP configuration and provider logs.",
    );
    return NextResponse.json(
      { error: `Your enquiry could not be sent. ${fallback}` },
      { status: 502 },
    );
  } finally {
    transport.close();
  }
}
