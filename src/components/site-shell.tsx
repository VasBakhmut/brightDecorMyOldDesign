import Image from "next/image";
import { MobileMenu } from "./interactive";
import { servicePages } from "@/lib/service-pages";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <span>Painting & property maintenance · Brisbane, QLD</span>
        <a href="tel:+61420750595">
          Let’s talk about your project <strong>0420 750 595</strong>
        </a>
      </div>
      <header className="header">
        <a href="/" className="brand" aria-label="Bright Decor home">
          <Image
            src="/images/logo.png"
            width={100}
            height={85}
            alt="Bright Decor painting services"
            priority
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/#projects">Our work</a>
          <a href="/#about">About us</a>
          <a href="/#faq">FAQs</a>
        </nav>
        <a href="/#contact" className="button header-quote">
          Get a free quote
        </a>
        <MobileMenu />
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <a href="/" className="footer-brand" aria-label="Bright Decor home">
            <Image
              src="/images/logo.png"
              alt="Bright Decor painting services"
              width={160}
              height={94}
            />
            <span>Painting spaces. Bringing them to life.</span>
          </a>
          <a href="/#contact">Have a project in mind? Let’s talk.</a>
        </div>
        <div className="footer-columns">
          <nav aria-label="Footer navigation">
            <h2>Explore Bright Decor</h2>
            <a href="/">Home</a>
            <a href="/services">All services</a>
            <a href="/#projects">Our work</a>
            <a href="/#about">About Max</a>
            <a href="/#faq">Frequently asked questions</a>
          </nav>
          <nav aria-label="Painting services">
            <h2>Our services</h2>
            {servicePages.map((s) => (
              <a key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </a>
            ))}
          </nav>
          <div>
            <h2>Contact Max</h2>
            <a href="tel:+61420750595">0420 750 595</a>
            <a href="mailto:max@brightdecor.com.au">max@brightdecor.com.au</a>
            <p>
              140 The Avenue
              <br />
              Sunnybank Hills QLD 4109
            </p>
            <p>
              Monday–Friday · 9am–5pm
              <br />
              Weekends by appointment
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bright Decor. All rights reserved.</p>
          <nav aria-label="Website policies">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Website terms</a>
            <a href="/cookies">Cookies</a>
            <a href="/accessibility">Accessibility</a>
          </nav>
        </div>
      </footer>
      <a href="/#contact" className="mobile-quote">
        Get a free quote
      </a>
    </>
  );
}
