import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3001";
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]),
);
assert.equal(
  urls.length,
  12,
  "Every public content page must be in the sitemap",
);
const titles = new Set();
let footer;
for (const url of urls) {
  const response = await fetch(`${base}${url.pathname}`);
  assert.equal(response.status, 200, url.pathname);
  const html = await response.text();
  assert.equal(
    (html.match(/<header\b/g) || []).length,
    1,
    `${url.pathname}: one shared header`,
  );
  assert.equal(
    (html.match(/<footer\b/g) || []).length,
    1,
    `${url.pathname}: one shared footer`,
  );
  const currentFooter = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
  if (footer)
    assert.equal(currentFooter, footer, `${url.pathname}: consistent footer`);
  else footer = currentFooter;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title);
  assert.ok(!titles.has(title), `${url.pathname}: unique title`);
  titles.add(title);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `${url.pathname}: canonical`);
  assert.equal(new URL(canonical[1]).pathname, url.pathname);
  assert.match(html, /rel="icon"[^>]*href="\/favicon-96.png"/);
  assert.match(
    html,
    /<nav[^>]*aria-label="Main navigation"[^>]*><a href="\/">Home<\/a>/,
  );
  for (const match of html.matchAll(/href="(#[^"]*)"/g))
    assert.equal(
      match[1],
      "#main",
      `${url.pathname}: only local skip link may be a bare hash`,
    );
  const schemas = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => JSON.parse(m[1]));
  const business = schemas.find((s) => s["@type"] === "HousePainter");
  assert.ok(business?.logo?.url.endsWith("/brand-logo.png"));
  if (url.pathname.startsWith("/services/")) {
    const service = schemas.find((s) => s["@type"] === "Service");
    assert.ok(service);
    assert.equal(service.provider["@id"], business["@id"]);
    assert.equal(new URL(service.url).pathname, url.pathname);
    assert.ok(schemas.some((s) => s["@type"] === "BreadcrumbList"));
  }
  console.log(
    `PASS ${url.pathname}: shared shell, navigation, metadata and schema`,
  );
}
const missing = await fetch(`${base}/services/does-not-exist`);
assert.equal(missing.status, 404);
const missingHtml = await missing.text();
assert.match(missingHtml, /<footer\b/);
assert.match(missingHtml, /noindex/);
for (const path of [
  "/favicon.ico",
  "/favicon-48.png",
  "/favicon-96.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/brand-logo.png",
]) {
  const r = await fetch(`${base}${path}`);
  assert.equal(r.status, 200, path);
  assert.ok((await r.arrayBuffer()).byteLength > 100);
}
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \//i);
assert.ok(!/Disallow: \/\s*$/m.test(robots));
console.log(
  "PASS unknown service returns 404 with shared footer; original-logo assets and crawl configuration are accessible.",
);
