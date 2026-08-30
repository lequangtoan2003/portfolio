"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroLightScene } from "@/components/HeroLightScene";
import { contactLinks, type Locale, portfolioContent } from "@/content/portfolio";

type PortfolioPageProps = {
  locale: Locale;
};

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const content = portfolioContent[locale];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const targetId = href.substring(hashIndex + 1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        window.history.pushState(null, "", href);
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label={content.accessibility.mainNavigation}>
          <Link
            className="brand"
            href={`${content.homePath}#home`}
            onClick={(e) => handleNavClick(e, `${content.homePath}#home`)}
          >
            {content.hero.title}
          </Link>
          <div className="nav-links">
            {content.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
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
          <HeroLightScene />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="home-title">{content.hero.title}</h1>
              <p className="hero-summary">{content.hero.summary}</p>
              <div className="hero-actions" aria-label={content.accessibility.quickLinks}>
                <Link
                  className="button primary"
                  href={`${content.homePath}#work`}
                  onClick={(e) => handleNavClick(e, `${content.homePath}#work`)}
                >
                  {content.hero.primaryCta}
                </Link>
                <Link
                  className="button secondary"
                  href={`${content.homePath}#contact`}
                  onClick={(e) => handleNavClick(e, `${content.homePath}#contact`)}
                >
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
          </div>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title">
          <div className="section-heading">
            <h2 id="about-title">{content.about.title}</h2>
          </div>
          <div className="about-content">
            <div className="about-hanging-wrapper">
              {/* Đinh đóng tường */}
              <div className="hanging-nail" aria-hidden="true">
                <span className="hanging-nail-head" />
              </div>

              {/* Sợi dây treo bảng */}
              <svg
                className="hanging-rope-svg"
                viewBox="0 0 240 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line
                  x1="120"
                  y1="4"
                  x2="44"
                  y2="38"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="hanging-rope-line"
                />
                <line
                  x1="120"
                  y1="4"
                  x2="196"
                  y2="38"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="hanging-rope-line"
                />
              </svg>

              {/* Chiếc bảng treo (Card bên trái) */}
              <div className="about-left hanging-board">
                <span className="hanging-eyelet eyelet-left" aria-hidden="true" />
                <span className="hanging-eyelet eyelet-right" aria-hidden="true" />

                <div className="about-left-header">
                  <div className="about-avatar-wrapper">
                    <Image
                      src={content.about.avatarUrl}
                      alt={content.about.avatarAlt}
                      width={140}
                      height={140}
                      className="about-avatar"
                    />
                    <span className="about-avatar-status" title="Active" />
                  </div>
                  <div className="about-stats-grid">
                    {content.about.stats.map((stat, index) => (
                      <div className="about-stat-card" key={index}>
                        <span className="about-stat-value">{stat.value}</span>
                        <span className="about-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="about-left-body">
                  <div className="about-description-paragraphs">
                    {content.about.summary.split("\n\n").map((paragraph, index) => (
                      <p className="about-description" key={index}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {content.about.tags && (
                    <div className="about-tags-row">
                      {content.about.tags.map((tag, idx) => (
                        <span className="about-tag-pill" key={idx}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {content.about.statusBadge && (
                    <div className="about-status-banner">
                      <span className="about-status-pulse" />
                      <span>{content.about.statusBadge}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="about-right">
              <div className="about-cards-grid">
                {content.about.values.map((card, index) => {
                  const domains = [
                    "clean.architecture.dev",
                    "design.system.dev",
                    "perf.speed.dev",
                    "workflow.collab.dev",
                    "passion.growth.dev",
                    "creative.lab.dev",
                  ];
                  return (
                    <article className={`window-card window-card-${index}`} key={card.title}>
                      <div className="window-card-header">
                        <div className="window-dots">
                          <span className="window-dot dot-red" />
                          <span className="window-dot dot-yellow" />
                          <span className="window-dot dot-green" />
                        </div>
                        <span className="window-domain">{domains[index]}</span>
                      </div>
                      <div className="window-card-body">
                        <div className="window-card-top">
                          <div className="window-card-title-group">
                            <h3 className="window-card-title">{card.title}</h3>
                            <p className="window-card-desc">{card.description}</p>
                          </div>
                          {index === 2 && (
                            <span className="window-badge-pill">99% Speed</span>
                          )}
                        </div>

                        <div className="window-card-visual">
                          {index === 0 && (
                            <div className="visual-ide">
                              <div className="visual-avatar-orb orb-purple" />
                              <div className="visual-ide-lines">
                                <div className="ide-bar bar-long" />
                                <div className="ide-bar bar-short" />
                              </div>
                            </div>
                          )}

                          {index === 1 && (
                            <div className="visual-pills">
                              <span className="visual-pill">UI/UX</span>
                              <span className="visual-pill">Figma</span>
                              <span className="visual-pill">Responsive</span>
                            </div>
                          )}

                          {index === 2 && (
                            <div className="visual-chart">
                              <div className="visual-chart-line">
                                <span className="chart-node node-yellow" />
                                <span className="chart-node node-white" />
                                <span className="chart-node node-blue" />
                              </div>
                            </div>
                          )}

                          {index === 3 && (
                            <div className="visual-flow">
                              <div className="flow-block block-white" />
                              <div className="flow-connector" />
                              <div className="flow-block block-yellow" />
                              <div className="flow-connector" />
                              <div className="flow-block block-white" />
                            </div>
                          )}

                          {index === 4 && (
                            <div className="visual-growth">
                              <div className="visual-avatar-orb orb-gradient" />
                              <div className="visual-growth-bars">
                                <div className="growth-bar bar-wide" />
                                <div className="growth-bar bar-med" />
                              </div>
                            </div>
                          )}

                          {index === 5 && (
                            <div className="visual-blocks">
                              <div className="module-block block-light" />
                              <div className="module-block block-orange" />
                              <div className="module-block block-light" />
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="section" aria-labelledby="stack-title">
          <div className="section-heading">
            <h2 id="stack-title">{content.skills.title}</h2>
            <p>{content.skills.summary}</p>
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
            <h3>{content.work.techStackTitle}</h3>
            <div className="stack-list">
              {content.techStack.map((group) => (
                <article className="stack-row" key={group.title}>
                  <h4>{group.title}</h4>
                  <p>{group.items.join(" / ")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">{content.work.title}</h2>
            <p>{content.work.summary}</p>
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

        <section id="contact" className="section split-section contact-section" aria-labelledby="contact-title">
          <div className="section-heading">
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
        <Link
          href={`${content.homePath}#home`}
          onClick={(e) => handleNavClick(e, `${content.homePath}#home`)}
        >
          {content.nav[0].label}
        </Link>
      </footer>
    </>
  );
}
