"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects, services } from "@/lib/content";

export function Motion() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    elements.forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      elements.forEach((el) => el.classList.remove("will-reveal"));
    };
  }, []);
  return null;
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <div className="mobile-nav">
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation">
          {[
            ["Home", "/"],
            ["Services", "/services"],
            ["Our work", "/#projects"],
            ["About us", "/#about"],
            ["FAQs", "/#faq"],
            ["Free quote", "/#contact"],
          ].map(([text, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const item = services[active];
  return (
    <div className="service-layout">
      <div
        className="service-list"
        role="tablist"
        aria-label="Painting services"
      >
        {services.map((s, i) => (
          <button
            key={s.name}
            id={`service-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="service-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (
                [
                  "ArrowDown",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowLeft",
                  "Home",
                  "End",
                ].includes(e.key)
              ) {
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (active +
                          (["ArrowDown", "ArrowRight"].includes(e.key)
                            ? 1
                            : 2)) %
                        3;
                setActive(n);
                document.getElementById(`service-tab-${n}`)?.focus();
              }
            }}
            className={active === i ? "active" : ""}
          >
            <span>{s.name}</span>
            <span aria-hidden="true">{active === i ? "−" : "+"}</span>
          </button>
        ))}
        <p>
          From the first coat to the final detail,
          <br />
          we take care of your space.
        </p>
      </div>
      <div
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${active}`}
        className="service-panel"
      >
        <div className="service-photo">
          <Image
            key={item.image}
            src={`/images/${item.image}.webp`}
            alt={`${item.name} painting by Bright Decor`}
            fill
            sizes="(max-width: 700px) 90vw, 50vw"
          />
        </div>
        <div className="service-copy">
          <h3>{item.detail}</h3>
          <p>{item.description}</p>
          <div className="tags">
            {item.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a
            href={`/services/${["residential-painting", "commercial-painting", "body-corporate-painting"][active]}`}
            className="text-link"
          >
            Explore {item.name.toLowerCase()} painting
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectGallery() {
  const [filter, setFilter] = useState("All work");
  return (
    <>
      <div className="filters" aria-label="Filter projects">
        {[
          "All work",
          "Residential",
          "Commercial",
          "Body corporate",
          "Special finishes",
        ].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={filter === f ? "selected" : ""}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {projects
          .filter((p) => filter === "All work" || p.category === filter)
          .map((p) => (
            <figure key={p.title} className="project">
              <div className="project-image">
                <Image
                  src={`/images/${p.image}.webp`}
                  alt={p.caption}
                  fill
                  sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 30vw"
                />
              </div>
              <figcaption>
                <span>{p.caption}</span>
                <h3>{p.title}</h3>
              </figcaption>
            </figure>
          ))}
      </div>
    </>
  );
}

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  return (
    <div className="comparison">
      <div className="comparison-images">
        <Image
          src="/images/timber-after.webp"
          alt="Timber deck after staining, with a restored rich brown finish"
          fill
          sizes="(max-width: 700px) 90vw, 50vw"
        />
        <div
          className="comparison-before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src="/images/timber-before.webp"
            alt="The same timber deck before staining"
            fill
            sizes="(max-width: 700px) 90vw, 50vw"
          />
        </div>
        <span className="comparison-label before">Before</span>
        <span className="comparison-label after">After</span>
        <div className="comparison-line" style={{ left: `${position}%` }}>
          <span aria-hidden="true">‹ ›</span>
        </div>
        <input
          aria-label="Compare deck before and after staining"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
        />
      </div>
      <p className="comparison-hint">
        Slide to see the difference · Timber restoration & staining
      </p>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(25000),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error ||
            "Your request could not be sent. Please call Max on 0420 750 595.",
        );
      setStatus("success");
      setMessage(
        "Thanks for getting in touch. Max will contact you to discuss your project.",
      );
      form.current?.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "The request timed out. Please try again or call Max on 0420 750 595.",
      );
    }
  }
  return (
    <form ref={form} className="quote-form" onSubmit={submit}>
      <h3>A great finish starts here.</h3>
      <p>Tell us a little about your project.</p>
      <div className="form-grid">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Full name"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Phone number <span>*</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
            placeholder="04XX XXX XXX"
          />
        </label>
        <label>
          Property suburb <span>*</span>
          <input
            name="suburb"
            autoComplete="address-level2"
            required
            maxLength={100}
            placeholder="e.g. Sunnybank Hills"
          />
        </label>
        <label className="full-width">
          What can we help with? <span>*</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>
            <option>Residential painting</option>
            <option>Commercial painting</option>
            <option>Body corporate painting</option>
            <option>Special finishes & maintenance</option>
          </select>
        </label>
        <label className="full-width">
          About your project <span>*</span>
          <textarea
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={5000}
            placeholder="What would you like painted or refreshed?"
          />
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this blank
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          I agree to Bright Decor using these details to respond to my enquiry.{" "}
          <a href="/privacy">Privacy policy</a>.
        </span>
      </label>
      <button
        type="submit"
        className="button dark"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? "Sending your request…"
          : "Request my free quote"}
      </button>
      <p
        className={`form-status ${status}`}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </p>
      <p className="form-note">
        No obligation. Just a conversation about your space.
      </p>
    </form>
  );
}
