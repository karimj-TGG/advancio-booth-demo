import Script from "next/script";

export default function Home() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="ambient__orb ambient__orb--one" />
        <div className="ambient__orb ambient__orb--two" />
        <div className="ambient__grid" />
        <div className="ambient__noise" />
      </div>

      <header className="site-header">
        <button className="brand" type="button" data-action="home" aria-label="Return to the beginning">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 42 36"><path d="M2 4h38L35 15 21 32 7 15Z" fill="currentColor"/><path d="M11 11h20l-5 7-10-3 5 10-4 4L8 13Z" fill="#fff"/></svg>
          </span>
          <span className="brand__name">advancio</span>
          <span className="brand__lab">SPARK</span>
        </button>
        <div className="header-actions">
          <div className="session-pill"><span /> LIVE BOOTH EXPERIENCE</div>
          <button className="icon-button back-button" type="button" data-action="back" aria-label="Go back" hidden>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            <span>Back</span>
          </button>
          <button className="icon-button" type="button" data-action="restart" aria-label="Restart experience">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7" /></svg>
            <span>Restart</span>
          </button>
        </div>
      </header>

      <main id="app" tabIndex={-1} />

      <footer className="site-footer">
        <span><strong>Pre-built accelerators:</strong> live in weeks, not months.</span>
        <span className="site-footer__capabilities"><strong>Need custom implementation?</strong> Ask us about FutureShoring.</span>
      </footer>

      <div className="idle-overlay" id="idleOverlay" role="dialog" aria-modal="true" aria-labelledby="idleTitle" hidden>
        <div className="idle-overlay__card">
          <span className="eyebrow">Still exploring?</span>
          <h2 id="idleTitle">Touch anywhere to keep your journey.</h2>
          <p>This experience will reset for the next visitor in <strong id="idleCount">15</strong> seconds.</p>
          <button className="primary-button" type="button" data-action="stay">Keep exploring</button>
        </div>
      </div>

      <div className="toast" id="toast" role="status" aria-live="polite" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" strategy="afterInteractive" />
      <Script src="/experience.js" strategy="afterInteractive" />
    </>
  );
}

