import Link from "next/link";

export default function HomePage() {
  return (
    <main id="home" className="page">
      <section className="hero" aria-labelledby="home-title">
        <p className="eyebrow">Portfolio 2026</p>
        <h1 id="home-title">Hello world</h1>
        <p className="summary">
          Trang khởi tạo đầu tiên cho portfolio cá nhân theo kiến trúc V5:
          tiếng Việt tại root và English tại URL riêng.
        </p>
        <Link className="locale-link" href="/en">
          English version
        </Link>
      </section>
    </main>
  );
}
