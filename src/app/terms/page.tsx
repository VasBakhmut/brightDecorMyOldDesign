import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";
import { policies } from "@/lib/policies";
export const metadata = pageMetadata(
  "Website Terms | Bright Decor",
  policies.terms.description,
  "/terms",
);
export default function Terms() {
  return <PolicyPage kind="terms" />;
}
