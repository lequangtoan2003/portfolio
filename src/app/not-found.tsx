import Link from "next/link";
import "./globals.css";
import { contentFont, headingFont } from "@/app/fonts";

export default function NotFound() {
  return (
    <html
      lang="vi"
      className={`${contentFont.variable} ${headingFont.variable}`}
    >
      <body>
        <main className="page">
          <section className="hero" aria-labelledby="not-found-title">
            <p className="eyebrow">404</p>
            <h1 id="not-found-title">Page not found</h1>
            <p className="summary">
              Không tìm thấy trang / The requested page could not be found.
            </p>
            <Link className="locale-link" href="/">
              Trang chủ
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
