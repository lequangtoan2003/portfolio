"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroLightScene } from "@/components/HeroLightScene";
import {
  contactLinks,
  type Locale,
  portfolioContent,
} from "@/content/portfolio";

type PortfolioPageProps = {
  locale: Locale;
};

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const content = portfolioContent[locale];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
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
        <section
          id="home"
          className="hero-section"
          aria-labelledby="home-title"
        >
          <HeroLightScene />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="home-title">{content.hero.title}</h1>
              <p className="hero-summary">{content.hero.summary}</p>
              <div
                className="hero-actions"
                aria-label={content.accessibility.quickLinks}
              >
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
                  onClick={(e) =>
                    handleNavClick(e, `${content.homePath}#contact`)
                  }
                >
                  {content.hero.secondaryCta}
                </Link>
              </div>
            </div>
            <div
              className="hero-panel"
              aria-label={content.accessibility.profileSummary}
            >
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

        <section
          id="about"
          className="section about-section"
          aria-labelledby="about-title"
        >
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
                <span
                  className="hanging-eyelet eyelet-left"
                  aria-hidden="true"
                />
                <span
                  className="hanging-eyelet eyelet-right"
                  aria-hidden="true"
                />

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
                    {content.about.summary
                      .split("\n\n")
                      .map((paragraph, index) => (
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
                    <article
                      className={`window-card window-card-${index}`}
                      key={card.title}
                    >
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
                            <p className="window-card-desc">
                              {card.description}
                            </p>
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

          <div className="skills-ide-stage">
            {/* The 3-box Card Grid with Crisp White Borders */}
            <div className="skills-ide-grid">
              {content.skillCards.map((card) => {
                return (
                  <article
                    className={`skill-ide-card card-${card.id}`}
                    key={card.id}
                  >
                    <div className="skill-ide-header">
                      <div className="skill-icon-wrapper">
                        {card.icon === "monitor" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="skill-icon"
                            aria-hidden="true"
                          >
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                          </svg>
                        )}
                        {card.icon === "react" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="skill-icon"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="2.2" />
                            <ellipse
                              cx="12"
                              cy="12"
                              rx="9.2"
                              ry="3.8"
                              transform="rotate(0 12 12)"
                            />
                            <ellipse
                              cx="12"
                              cy="12"
                              rx="9.2"
                              ry="3.8"
                              transform="rotate(60 12 12)"
                            />
                            <ellipse
                              cx="12"
                              cy="12"
                              rx="9.2"
                              ry="3.8"
                              transform="rotate(120 12 12)"
                            />
                          </svg>
                        )}
                        {card.icon === "flutter" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="skill-icon"
                            aria-hidden="true"
                          >
                            <path d="M14 2L3 13l3.5 3.5L20 3h-6z" />
                            <path d="M14 13l-4 4 4 4h6l-6-6 6-6h-6z" />
                          </svg>
                        )}
                      </div>
                      <div className="skill-title-group">
                        <h3 className="skill-heading">
                          <span
                            className="skill-accent-wrap"
                            style={
                              {
                                "--accent-line-color": card.accentColor,
                              } as React.CSSProperties
                            }
                          >
                            {card.titleAccent}
                          </span>
                        </h3>
                        <div className="skill-second-line">
                          {card.titleSecondLine}
                        </div>
                      </div>
                    </div>

                    <div className="skill-ide-body">
                      <div className="skill-code-tag" aria-hidden="true">
                        &lt;h3&gt;
                      </div>

                      <div className="skill-code-content">
                        <p className="skill-desc-text">{card.description}</p>

                        <div
                          className="skill-primary-highlight-box"
                          aria-label="Kỹ năng chính"
                        >
                          <span className="skill-primary-label">
                            {locale === "vi" ? "Kỹ năng chính:" : "Core Stack:"}
                          </span>
                          <div className="skill-primary-tags">
                            {card.primarySkills.map((tech) => (
                              <span className="primary-skill-badge" key={tech}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="skill-sub-list">
                          {card.subSkills.map((sub, idx) => (
                            <div className="skill-sub-item" key={idx}>
                              <span className="skill-sub-label">
                                {sub.label}:
                              </span>{" "}
                              <span className="skill-sub-val">{sub.items}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="skill-code-tag" aria-hidden="true">
                        &lt;/h3&gt;
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Real Syntax Highlighted HTML Watermark Background placed BELOW the boxes */}
            <div className="skills-ide-watermark-bottom" aria-hidden="true">
              <div className="code-line">
                <span className="syn-tag">&lt;html</span>{" "}
                <span className="syn-attr">lang</span>=
                <span className="syn-str">&quot;en&quot;</span>
                <span className="syn-tag">&gt;</span>
              </div>
              <div className="code-line indent-1">
                <span className="syn-tag">&lt;head&gt;</span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;meta</span>{" "}
                <span className="syn-attr">name</span>=
                <span className="syn-str">&quot;viewport&quot;</span>{" "}
                <span className="syn-attr">content</span>=
                <span className="syn-str">
                  &quot;width=device-width, initial-scale=1.0&quot;
                </span>
                <span className="syn-tag">&gt;</span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;title&gt;</span>
                <span className="syn-dim">What do I do</span>
                <span className="syn-tag">&lt;/title&gt;</span>
              </div>
              <div className="code-line indent-1">
                <span className="syn-tag">&lt;/head&gt;</span>
              </div>
              <div className="code-line indent-1">
                <span className="syn-tag">&lt;body&gt;</span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;h1&gt;</span>
                <span className="syn-dim">
                  Things I do to get a perfect background image
                </span>
                <span className="syn-tag">&lt;/h1&gt;</span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;p&gt;</span>
              </div>
              <div className="code-line indent-3">
                <span className="syn-dim">
                  Maybe I should stop tinkering with VSCode settings just to
                  take a screenshot of this dummy html code.
                </span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;/p&gt;</span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;span&gt;</span>
              </div>
              <div className="code-line indent-3">
                <span className="syn-dim">
                  Oops, Almost forgot to say &quot;Hello World!&quot;!
                </span>
              </div>
              <div className="code-line indent-2">
                <span className="syn-tag">&lt;/span&gt;</span>
              </div>
              <div className="code-line indent-1">
                <span className="syn-tag">&lt;/body&gt;</span>
              </div>
              <div className="code-line">
                <span className="syn-tag">&lt;/html&gt;</span>
              </div>
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
                    <a
                      className="text-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
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

          {content.education && content.education.length > 0 && (
            <div className="subsection">
              <h3>{content.work.educationTitle}</h3>
              <div className="experience-list">
                {content.education.map((item) => (
                  <article className="experience-item" key={item.institution}>
                    <div>
                      <h4>{item.institution}</h4>
                      <p>{item.degree}</p>
                    </div>
                    <div>
                      <span>{item.period}</span>
                      <p>
                        {item.gpa} • {item.english}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {content.certificates && content.certificates.length > 0 && (
            <div className="subsection">
              <h3>{content.work.certificatesTitle}</h3>
              <div className="experience-list">
                {content.certificates.map((cert) => (
                  <article className="experience-item" key={cert.title}>
                    <div>
                      <h4>{cert.title}</h4>
                      <p>{cert.issuer}</p>
                    </div>
                    <div>
                      <span>{cert.issueDate}</span>
                      {cert.credentialUrl ? (
                        <p>
                          <a
                            className="text-link"
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {locale === "vi"
                              ? "Xem chứng chỉ"
                              : "View Certificate"}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        <section
          id="contact"
          className="section split-section contact-section"
          aria-labelledby="contact-title"
        >
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
                  <a
                    href={contactLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
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
