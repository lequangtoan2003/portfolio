import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <section className="hero" aria-labelledby="not-found-title">
        <p className="eyebrow">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p className="summary">
          Khong tim thay trang / The requested page could not be found.
        </p>
        <Link className="locale-link" href="/">
          Trang chu
        </Link>
      </section>
    </main>
  );
}
