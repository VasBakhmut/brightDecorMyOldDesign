import Image from "next/image";
import {
  BeforeAfter,
  ContactForm,
  Motion,
  ProjectGallery,
  Services,
} from "@/components/interactive";
import { faqs } from "@/lib/content";
function Check() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
export default function Home() {
  return (
    <>
      <Motion />
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-line" /> YOUR LOCAL BRISBANE PAINTERS
            </p>
            <h1>
              A brighter outlook.
              <br />A <em>beautiful</em>
              <br />
              finish.
            </h1>
            <p className="hero-description">
              Good painting changes how a place feels. <br />
              We bring care, craftsmanship and over 20 years
              <br className="desktop-break" /> of experience to every space.
            </p>
            <div className="hero-actions">
              <a className="button dark" href="/#contact">
                Get a free quote
              </a>
              <a className="underlined" href="/#projects">
                Explore our work
              </a>
            </div>
            <div className="hero-assurance">
              <Check />
              <span>Licensed & insured</span>
              <span className="tiny-dot" />
              <span>5-year workmanship guarantee</span>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src="/images/hero.webp"
              alt="Freshly painted home with a crisp white garage and warm exterior detail"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 57vw"
            />
            <div className="photo-caption">
              <span>Spaces renewed. Details considered.</span>
              <span>BRIGHT DECOR</span>
            </div>
            <div className="experience-stamp">
              <strong>
                20<span>+</span>
              </strong>
              <span>
                YEARS OF
                <br />
                EXPERIENCE
              </span>
            </div>
          </div>
          <div className="hero-footer">
            <span>RESIDENTIAL</span>
            <i />
            <span>COMMERCIAL</span>
            <i />
            <span>BODY CORPORATE</span>
            <a href="/#services" aria-label="Discover our services">
              SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <div className="trust-strip">
          <p>
            <Check /> Licensed, insured & QBCC certified
          </p>
          <p>
            <Check /> Detailed quotes & clear timelines
          </p>
          <p>
            <Check /> 5-year workmanship guarantee
          </p>
        </div>
        <section id="services" className="section services-section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2>
                A little colour.
                <br />A lot of possibility.
              </h2>
            </div>
            <p>
              Places to live, work and come together.
              <br />
              Thoughtful painting and maintenance,
              <br />
              tailored to your property.
            </p>
          </div>
          <Services />
          <a href="/services" className="text-link all-services-link">
            Explore all painting services
          </a>
          <div className="special-services">
            <p>IT’S IN THE DETAILS, TOO</p>
            <a href="/services/special-finishes">
              French Wash & special finishes
            </a>
            <a href="/services/timber-staining">Timber staining</a>
            <a href="/services/rust-treatment-protective-coatings">
              Rust treatment & protective coatings
            </a>
          </div>
        </section>
        <section id="projects" className="section projects-section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">OUR WORK</p>
              <h2>
                Real spaces.
                <br />A fresh perspective.
              </h2>
            </div>
            <p>
              A closer look at the care that goes into our work.
              <br />
              Every photo is from a Bright Decor project.
            </p>
          </div>
          <ProjectGallery />
        </section>
        <section className="transformation section">
          <div className="transformation-copy" data-reveal>
            <p className="eyebrow">MORE THAN A FRESH COAT</p>
            <h2>
              The difference
              <br />
              is in the detail.
            </h2>
            <p>
              A lasting finish starts long before the paint goes on. Cleaning,
              repairs, sanding and the right products make all the difference.
            </p>
            <p>
              From weathered timber to a freshly stained deck, we give every
              surface the attention it deserves.
            </p>
            <a href="/#contact" className="text-link">
              Let’s talk about your space
            </a>
          </div>
          <BeforeAfter />
        </section>
        <section id="about" className="about-section">
          <div className="about-photo">
            <Image
              src="/images/max.webp"
              alt="Max, the person behind Bright Decor"
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
            />
          </div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">THE PERSON BEHIND THE BRUSH</p>
            <h2>
              Hi, I’m Max.
              <br />
              Your space matters
              <br />
              to me.
            </h2>
            <p>
              With over 20 years of experience and a real focus on customer
              satisfaction, I bring a practical eye and a personal approach to
              painting and property maintenance.
            </p>
            <p>
              Whether you’re refreshing your home or looking after a business
              property, you can count on clear communication, careful
              preparation and pride in the finished work.
            </p>
            <div className="signature">
              Max<span>Maksym Gaievskyi · Bright Decor</span>
            </div>
            <a href="/#contact" className="button light">
              Start a conversation
            </a>
          </div>
        </section>
        <section className="process section">
          <p className="eyebrow">FROM FIRST HELLO TO FINAL COAT</p>
          <h2>
            A good experience.
            <br />
            From start to finish.
          </h2>
          <div className="process-grid">
            {[
              [
                "01",
                "Let’s talk",
                "Tell Max about your property and what you have in mind. We’ll arrange a time to look at the work.",
              ],
              [
                "02",
                "A clear plan",
                "Receive a detailed, no-obligation quote with the scope of work and a clear timeline.",
              ],
              [
                "03",
                "Care in every coat",
                "We prepare carefully, protect your space and bring your project to life with a quality finish.",
              ],
            ].map(([n, title, copy]) => (
              <div key={n} data-reveal>
                <span className="step-number">{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="faq" className="faq-section section">
          <div>
            <p className="eyebrow">GOOD QUESTIONS</p>
            <h2>
              A few things
              <br />
              you might ask.
            </h2>
            <p>
              Something else on your mind?
              <br />
              <a href="tel:+61420750595" className="text-link">
                Give Max a call
              </a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
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
        <section id="contact" className="contact-section section">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">LET’S MAKE A START</p>
            <h2>
              Your place.
              <br />
              Its next chapter.
            </h2>
            <p>
              Book a no-obligation, hassle-free quote.
              <br />
              We’d love to hear what you have in mind.
            </p>
            <a href="tel:+61420750595" className="contact-phone">
              0420 750 595
            </a>
            <a href="mailto:max@brightdecor.com.au">max@brightdecor.com.au</a>
            <div className="contact-details">
              <div>
                <span>BASED IN BRISBANE</span>
                <p>
                  140 The Avenue
                  <br />
                  Sunnybank Hills QLD 4109
                </p>
              </div>
              <div>
                <span>WHEN TO REACH US</span>
                <p>
                  Monday – Friday · 9am – 5pm
                  <br />
                  Weekends by appointment
                </p>
              </div>
            </div>
            <div className="contact-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
