import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contactSchema,
  createRateLimiter,
  enquiryText,
} from "../src/lib/contact.ts";
const enquiry = {
  name: "Test Customer",
  email: "test@example.com",
  phone: "0420 000 000",
  suburb: "Sunnybank Hills",
  service: "Residential painting",
  message: "Please quote an exterior repaint.",
  consent: "yes",
  website: "",
};
test("accepts enquiry and includes all useful details in plain text", () => {
  const d = contactSchema.parse(enquiry);
  const text = enquiryText(d);
  for (const value of [
    d.name,
    d.email,
    d.phone,
    d.suburb,
    d.service,
    d.message,
  ])
    assert.ok(text.includes(value));
});
test("rejects missing consent, malformed email, unsupported service and oversized messages", () => {
  for (const changes of [
    { consent: "" },
    { email: "bad" },
    { service: "unlisted" },
    { message: "x".repeat(5001) },
    { name: "Test\r\nBcc: other@example.com" },
    { phone: "<script>" },
  ])
    assert.equal(
      contactSchema.safeParse({ ...enquiry, ...changes }).success,
      false,
    );
});
test("rate limit isolates senders and expires", () => {
  const allow = createRateLimiter(2, 1000);
  assert.equal(allow("one", 0), true);
  assert.equal(allow("one", 1), true);
  assert.equal(allow("one", 2), false);
  assert.equal(allow("two", 2), true);
  assert.equal(allow("one", 1000), true);
});
