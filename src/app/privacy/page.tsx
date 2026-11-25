import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
export const metadata = pageMetadata(
  "Privacy Policy | Bright Decor",
  "How Bright Decor handles your quote enquiry and contact details.",
  "/privacy",
);
export default function Privacy() {
  return (
    <main id="main" className="privacy-page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ]}
      />
      <a href="/" className="button">
        Back to Bright Decor
      </a>
      <h1>
        Your details,
        <br />
        handled with care.
      </h1>
      <p>
        Bright Decor uses the information you provide through the quote form to
        respond to your enquiry, discuss your property and arrange a quote or
        service.
      </p>
      <h2>What we collect</h2>
      <p>
        Your name, email address, phone number, suburb, the service you are
        interested in and the project details you choose to share. Please avoid
        including sensitive personal information in your message.
      </p>
      <h2>How we use and share it</h2>
      <p>
        Your enquiry is sent to Bright Decor by email. Website hosting and email
        providers process the information needed to deliver that enquiry. We do
        not sell your contact details or add you to a marketing list through
        this form.
      </p>
      <h2>Technical information</h2>
      <p>
        The website uses an IP address temporarily to limit repeated form
        submissions. Hosting providers may retain technical access logs for
        security and operation. Fonts are loaded from Google Fonts, which
        receives technical information such as your IP address when your browser
        requests them. This website does not use advertising cookies or
        analytics trackers.
      </p>
      <h2>Keeping and updating your details</h2>
      <p>
        Enquiries may be retained in business email records for responding to
        you and managing related work. To request access, corrections or
        deletion, contact Max at{" "}
        <a href="mailto:max@brightdecor.com.au">max@brightdecor.com.au</a> or{" "}
        <a href="tel:+61420750595">0420 750 595</a>. Some records may need to be
        retained for business or legal obligations.
      </p>
      <h2>Contact</h2>
      <p>
        Bright Decor
        <br />
        140 The Avenue, Sunnybank Hills QLD 4109
        <br />
        <a href="mailto:max@brightdecor.com.au">max@brightdecor.com.au</a>
      </p>
    </main>
  );
}
