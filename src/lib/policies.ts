export const policies = {
  terms: {
    name: "Website terms",
    description:
      "Terms for using the Bright Decor website and requesting a painting quote.",
    intro:
      "This website provides information about Bright Decor painting and property maintenance services. You can use it to explore our work, contact Max and request a no-obligation quote.",
    sections: [
      {
        heading: "Does sending an enquiry book a job?",
        text: "No. Submitting the form is a request to discuss your project. Work, availability, scope, pricing and timing need to be confirmed with Bright Decor before a job is agreed.",
      },
      {
        heading: "How are prices and project conditions confirmed?",
        text: "The website does not provide a fixed price for your property. Max prepares a quote based on the proposed work. Refer to your individual quote and any agreed project terms for the scope, coatings, schedule and guarantee conditions.",
      },
      {
        heading: "Can I reuse the photographs and logo?",
        text: "The Bright Decor name, logo, project photographs and website content are provided to describe this business. Contact Max for permission before reusing them for another business or publishing them elsewhere.",
      },
      {
        heading: "What if I notice an error?",
        text: "Contact Max if a service description or contact detail appears incorrect, or if you need clarification before relying on information for your project. Website information may be updated as services and details change.",
      },
      {
        heading: "Who can I contact about these terms?",
        text: "Contact Bright Decor at max@brightdecor.com.au or call 0420 750 595. These website terms do not replace the terms of an individual painting quote or agreement.",
      },
    ],
  },
  cookies: {
    name: "Cookies & website technology",
    description:
      "How the Bright Decor website uses cookies, local preferences, fonts and technical information.",
    intro:
      "Bright Decor does not set advertising or analytics cookies. The enquiry form and interactive gallery work without a tracking-cookie consent banner.",
    sections: [
      {
        heading: "Does this website store tracking preferences?",
        text: "The gallery filter, service tabs and before-and-after slider keep their state only while you use the page. They do not save a profile in cookies or browser local storage.",
      },
      {
        heading: "Which external services can receive technical information?",
        text: "Fonts load from Google Fonts. Your browser sends technical information, including an IP address, when requesting those files. The website host also processes requests needed to display the pages and images.",
      },
      {
        heading: "How is the contact form protected?",
        text: "The server temporarily uses an IP address to limit repeated form submissions. This protection does not require a cookie. Enquiry details are processed to respond to your request; see the privacy policy for more information.",
      },
      {
        heading: "Can I control cookies in my browser?",
        text: "Yes. Your browser settings let you block or remove cookies and control site permissions. This website does not require advertising or analytics cookies to display its content or submit an enquiry.",
      },
    ],
  },
  accessibility: {
    name: "Accessibility",
    description:
      "Accessibility features on the Bright Decor website and alternative ways to request a painting quote.",
    intro:
      "You can explore Bright Decor services and contact Max using a keyboard, phone or email. If part of this website is difficult to use, please tell us what happened so we can work on it.",
    sections: [
      {
        heading: "Which navigation options are available?",
        text: "The site includes a skip-to-content link, visible keyboard focus, labelled form fields and breadcrumbs on service pages. Shared navigation and contact links appear across the website.",
      },
      {
        heading: "How do I use the interactive controls?",
        text: "Use Tab to reach controls. Use arrow keys to switch service tabs and adjust the before-and-after slider. FAQ questions open with Enter or Space. The mobile menu can be closed with Escape.",
      },
      {
        heading: "Can I reduce animation?",
        text: "The website respects the reduced-motion preference in your device or browser settings. Page content and enquiry options remain available when animation is reduced or JavaScript is unavailable, although interactive features and the online form require JavaScript.",
      },
      {
        heading: "How can I report a problem or request a quote another way?",
        text: "Call Max on 0420 750 595 or email max@brightdecor.com.au. For an accessibility problem, include the page address, the feature you were trying to use and your browser or assistive technology if you are comfortable sharing it.",
      },
    ],
  },
} as const;
