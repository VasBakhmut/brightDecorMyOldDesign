export default function NotFound() {
  return (
    <main id="main" className="privacy-page status-page">
      <p className="eyebrow">PAGE NOT FOUND · 404</p>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>
        The page you requested could not be found. You can explore our painting
        services or contact Max about your project.
      </p>
      <div className="status-actions">
        <a href="/" className="button dark">
          Back to Home
        </a>
        <a href="/services" className="text-link">
          Explore painting services
        </a>
      </div>
    </main>
  );
}
