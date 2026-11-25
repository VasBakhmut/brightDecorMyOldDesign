"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="privacy-page status-page">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>This page couldn’t load.</h1>
      <p>
        Please try again. To discuss your project, you can also call Max on{" "}
        <a href="tel:+61420750595">0420 750 595</a> or{" "}
        <a href="mailto:max@brightdecor.com.au">email Bright Decor</a>.
      </p>
      <div className="status-actions">
        <button onClick={reset} className="button dark">
          Try again
        </button>
        <a href="/">Back to Home</a>
      </div>
    </main>
  );
}
