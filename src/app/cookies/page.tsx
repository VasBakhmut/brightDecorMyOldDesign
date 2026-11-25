import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";
import { policies } from "@/lib/policies";
export const metadata = pageMetadata(
  "Cookies & Website Technology | Bright Decor",
  policies.cookies.description,
  "/cookies",
);
export default function Cookies() {
  return <PolicyPage kind="cookies" />;
}
