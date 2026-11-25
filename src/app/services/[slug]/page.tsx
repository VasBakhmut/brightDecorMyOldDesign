import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { BeforeAfter } from "@/components/interactive";
import { servicePages, projectDescriptions } from "@/lib/service-pages";
import { businessId, pageMetadata, siteUrl } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) notFound();
  return pageMetadata(
    service.title,
    service.description,
    `/services/${service.slug}`,
    `/images/${service.image}.webp`,
  );
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${siteUrl}${path}#service`,
          name: service.heading,
          serviceType: service.name,
          description: service.intro,
          url: `${siteUrl}${path}`,
          image: `${siteUrl}/images/${service.image}.webp`,
          provider: { "@id": businessId },
          areaServed: { "@type": "City", name: "Brisbane" },
        }}
      />
      <section className="section service-detail-hero">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]}
        />
        <div className="service-detail-grid">
          <div>
            <p className="eyebrow">BRIGHT DECOR · BRISBANE</p>
            <h1>{service.heading}</h1>
            <p className="page-intro">{service.intro}</p>
            <a className="button dark" href="/#contact">
              Get a free quote
            </a>
            <a href="tel:+61420750595" className="service-call">
              Or call Max · 0420 750 595
            </a>
          </div>
          <div className="service-detail-image">
            <Image
              src={`/images/${service.image}.webp`}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 700px) 90vw, 45vw"
            />
          </div>
        </div>
      </section>
      <section className="section service-explanation">
        <div>
          <p className="eyebrow">YOUR PROJECT</p>
          <h2>{service.question}</h2>
          {service.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside>
          <h3>What can we help with?</h3>
          <ul>
            {service.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Brisbane · Based in Sunnybank Hills
            <br />
            Monday–Friday, 9am–5pm
            <br />
            Weekends by appointment
          </p>
          <a href="/#contact" className="text-link">
            Discuss your property with Max
          </a>
        </aside>
      </section>
      <section className="section service-work">
        <p className="eyebrow">BRIGHT DECOR PROJECT PHOTOGRAPHS</p>
        <h2>What does our work look like?</h2>
        {service.slug === "timber-staining" ? (
          <div className="service-comparison">
            <BeforeAfter />
          </div>
        ) : (
          <div className="service-gallery">
            {service.gallery.map((image) => (
              <figure key={image}>
                <div>
                  <Image
                    src={`/images/${image}.webp`}
                    alt={`${projectDescriptions[image] || service.name} — Bright Decor`}
                    fill
                    sizes="(max-width: 700px) 90vw, 45vw"
                  />
                </div>
                <figcaption>
                  {projectDescriptions[image] || service.name} · Bright Decor
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
      <section className="section faq-section">
        <div>
          <p className="eyebrow">ABOUT THIS SERVICE</p>
          <h2>What else should you know?</h2>
        </div>
        <div className="faq-list">
          {service.faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section related-services">
        <h2>Looking for another service?</h2>
        <div className="related-links">
          {servicePages
            .filter((s) => s.slug !== slug)
            .map((s) => (
              <a key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </a>
            ))}
        </div>
      </section>
      <section className="section service-cta">
        <h2>How can we help with your project?</h2>
        <p>
          Tell Max about your property and arrange a no-obligation quote. The
          scope, preparation and timeline are discussed for your project.
        </p>
        <a href="/#contact" className="button dark">
          Request a free quote
        </a>
      </section>
    </main>
  );
}
