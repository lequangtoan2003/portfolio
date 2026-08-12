import Link from "next/link";

export default function EnglishHomePage() {
  return (
    <main id="home" className="page">
      <section className="hero" aria-labelledby="home-title">
        <p className="eyebrow">Portfolio 2026</p>
        <h1 id="home-title">Hello world</h1>
        <p className="summary">
          The first setup page for the personal portfolio, following the V5
          architecture with Vietnamese at root and English on its own URL.
        </p>
        <Link className="locale-link" href="/">
          Bản tiếng Việt
        </Link>
      </section>
    </main>
  );
}
