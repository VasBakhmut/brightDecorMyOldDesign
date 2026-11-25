import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { servicePages } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Painting Services Brisbane | Bright Decor",
  "Residential, commercial and body corporate painting, French Wash, timber staining and rust treatment in Brisbane. Explore Bright Decor services.",
  "/services",
);
export default function ServicesPage() {
  return (
    <main id="main">
      <section className="section service-index">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]}
        />
        <p className="eyebrow">PAINTING & PROPERTY MAINTENANCE</p>
        <h1>
          Painting services
          <br />
          in Brisbane.
        </h1>
        <p className="page-intro">
          Bright Decor provides residential, commercial and body corporate
          painting in Brisbane, along with French Wash finishes, timber staining
          and rust treatment. Max brings over 20 years of experience and
          prepares a detailed quote for your property.
        </p>
        <h2>What does your property need?</h2>
        <div className="service-cards">
          {servicePages.map((s) => (
            <article key={s.slug}>
              <a href={`/services/${s.slug}`}>
                <div className="service-card-image">
                  <Image
                    src={`/images/${s.image}.webp`}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
                  />
                </div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <span className="text-link">Explore this service</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="service-cta section">
        <h2>How do I arrange a painting quote?</h2>
        <p>
          Call Max on 0420 750 595 or use the enquiry form. Tell us your suburb,
          the areas that need work and the finish you have in mind.
        </p>
        <a className="button dark" href="/#contact">
          Request a free quote
        </a>
      </section>
    </main>
  );
}
