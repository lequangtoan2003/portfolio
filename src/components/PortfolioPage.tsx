import Link from "next/link";
import { contactLinks, type Locale, portfolioContent } from "@/content/portfolio";

type PortfolioPageProps = {
  locale: Locale;
};

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const content = portfolioContent[locale];

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label={content.accessibility.mainNavigation}>
          <Link className="brand" href={`${content.homePath}#home`}>
            Le Quang Toan
          </Link>
          <div className="nav-links">
            {content.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link className="locale-switch" href={content.alternatePath}>
            {content.alternateLabel}
          </Link>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section" aria-labelledby="home-title">
          <div className="hero-copy">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 id="home-title">{content.hero.title}</h1>
            <p className="hero-summary">{content.hero.summary}</p>
            <div className="hero-actions" aria-label={content.accessibility.quickLinks}>
              <Link className="button primary" href={`${content.homePath}#work`}>
                {content.hero.primaryCta}
              </Link>
              <Link className="button secondary" href={`${content.homePath}#contact`}>
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="hero-panel" aria-label={content.accessibility.profileSummary}>
            <div className="panel-header">
              <span>Product stack</span>
              <span>2026</span>
            </div>
            <div className="panel-main">
              <span>React</span>
              <span>Next.js</span>
              <span>Vue</span>
              <span>Node.js</span>
              <span>Electron</span>
              <span>Automation</span>
            </div>
            <div className="panel-footer">
              <span>Web app</span>
              <span>Desktop app</span>
              <span>SEO/GEO</span>
            </div>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">01</p>
            <h2 id="work-title">{content.work.title}</h2>
            <p>{content.work.summary}</p>
          </div>

          <div className="subsection">
            <h3>{content.work.coreSkillsTitle}</h3>
            <div className="skill-grid">
              {content.skillGroups.map((group) => (
                <article className="compact-card" key={group.title}>
                  <h4>{group.title}</h4>
                  <ul className="tag-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="subsection">
            <h3 id="stack">{content.work.techStackTitle}</h3>
            <div className="stack-list">
              {content.techStack.map((group) => (
                <article className="stack-row" key={group.title}>
                  <h4>{group.title}</h4>
                  <p>{group.items.join(" / ")}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="subsection">
            <h3>{content.work.selectedWorkTitle}</h3>
            <div className="work-list">
              {content.workItems.map((item) => (
                <article className="work-card" key={item.title}>
                  <div className="work-meta">
                    <span>{item.period}</span>
                    <span>{item.role}</span>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                  <ul>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="tag-list">
                    {item.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {item.href ? (
                    <a className="text-link" href={item.href} target="_blank" rel="noreferrer">
                      {item.href.replace("https://", "")}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="subsection">
            <h3>{content.work.experienceTitle}</h3>
            <div className="experience-list">
              {content.experience.map((item) => (
                <article className="experience-item" key={item.company}>
                  <div>
                    <h4>{item.company}</h4>
                    <p>{item.role}</p>
                  </div>
                  <div>
                    <span>{item.period}</span>
                    <p>{item.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section split-section" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">02</p>
            <h2 id="about-title">{content.about.title}</h2>
          </div>
          <div className="section-body">
            <p>{content.about.summary}</p>
            <ul className="check-list">
              {content.about.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="section split-section contact-section" aria-labelledby="contact-title">
          <div className="section-heading">
            <p className="eyebrow">03</p>
            <h2 id="contact-title">{content.contact.title}</h2>
          </div>
          <div className="section-body">
            <p>{content.contact.summary}</p>
            <dl className="contact-list">
              <div>
                <dt>{content.contact.emailLabel}</dt>
                <dd>
                  <a href={contactLinks.email}>{contactLinks.emailText}</a>
                </dd>
              </div>
              <div>
                <dt>{content.contact.githubLabel}</dt>
                <dd>
                  <a href={contactLinks.github} target="_blank" rel="noreferrer">
                    {contactLinks.githubText}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{content.contact.locationLabel}</dt>
                <dd>{content.contact.location}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{content.footer}</p>
        <Link href={`${content.homePath}#home`}>{content.nav[0].label}</Link>
      </footer>
    </>
  );
}
