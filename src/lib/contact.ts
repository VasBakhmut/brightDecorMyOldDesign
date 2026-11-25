import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[^\r\n]+$/),
  email: z.email().max(254),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(30)
    .regex(/^[+\d\s().-]+$/),
  suburb: z.string().trim().min(2).max(100),
  service: z.enum([
    "Residential painting",
    "Commercial painting",
    "Body corporate painting",
    "Special finishes & maintenance",
  ]),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal("yes"),
  website: z.string().max(200).optional(),
});
export function enquiryText(data: z.infer<typeof contactSchema>) {
  return `New Bright Decor quote enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSuburb: ${data.suburb}\nService: ${data.service}\n\nProject details:\n${data.message}\n\nThe visitor agreed to be contacted about this enquiry.`;
}
export function createRateLimiter(limit = 5, windowMs = 60 * 60 * 1000) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()) => {
    for (const [k, v] of attempts) if (v.expires <= now) attempts.delete(k);
    const entry = attempts.get(key);
    if (entry && entry.count >= limit) return false;
    if (entry) entry.count++;
    else {
      if (attempts.size >= 10000) return false;
      attempts.set(key, { count: 1, expires: now + windowMs });
    }
    return true;
  };
}
