import { test } from "node:test";
import assert from "node:assert/strict";
import { allowsContactOrigin } from "../src/lib/contact-origin.ts";

test("production accepts the canonical origin and rejects other sites", () => {
  const env = {
    SITE_URL: "https://www.brightdecor.com.au",
    VERCEL_ENV: "production",
    VERCEL_URL: "bright-decor.vercel.app",
  };
  assert.equal(
    allowsContactOrigin(
      "https://www.brightdecor.com.au",
      "http://internal",
      env,
    ),
    true,
  );
  assert.equal(
    allowsContactOrigin(
      "https://bright-decor.vercel.app",
      "http://internal",
      env,
    ),
    false,
  );
  assert.equal(
    allowsContactOrigin(
      "https://another-site.vercel.app",
      "http://internal",
      env,
    ),
    false,
  );
});
test("preview accepts only its exact deployment and branch hosts", () => {
  const env = {
    SITE_URL: "https://www.brightdecor.com.au",
    VERCEL_ENV: "preview",
    VERCEL_URL: "bright-decor-abc.vercel.app",
    VERCEL_BRANCH_URL: "bright-decor-git-review.vercel.app",
  };
  for (const host of [env.VERCEL_URL, env.VERCEL_BRANCH_URL])
    assert.equal(
      allowsContactOrigin(`https://${host}`, "http://internal", env),
      true,
    );
  assert.equal(
    allowsContactOrigin("https://unrelated.vercel.app", "http://internal", env),
    false,
  );
  assert.equal(
    allowsContactOrigin(
      "https://bright-decor-abc.vercel.app.other.example",
      "http://internal",
      env,
    ),
    false,
  );
});
test("local development uses the current origin when no site URL is set", () => {
  assert.equal(
    allowsContactOrigin("http://localhost:3000", "http://localhost:3000", {}),
    true,
  );
  assert.equal(
    allowsContactOrigin("http://other.example", "http://localhost:3000", {}),
    false,
  );
});
