import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";
import { policies } from "@/lib/policies";
export const metadata = pageMetadata(
  "Accessibility | Bright Decor",
  policies.accessibility.description,
  "/accessibility",
);
export default function Accessibility() {
  return <PolicyPage kind="accessibility" />;
}
