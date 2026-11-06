import { useCallback, useMemo, useState } from 'react';
import { background, contact, projects, totalTests, type Shot } from './data';
import { useTheme } from './hooks';
import { ProjectRow } from './components/ProjectRow';
import { Lightbox } from './components/Lightbox';
import { AiProcess } from './components/AiProcess';

// The skills a hiring team is most likely to look for, in that order.
const FILTERS = ['AI agents', 'C#', 'Blazor', 'SQL Server', 'Entity Framework Core', 'ASP.NET Core', 'Angular', '.NET MAUI', 'xUnit'];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [skill, setSkill] = useState<string | null>(null);
  const [open, setOpen] = useState<{ title: string; shots: Shot[]; start?: number } | null>(null);

  const shown = useMemo(() => (skill ? projects.filter(p => p.skills.includes(skill)) : projects), [skill]);

  const pickSkill = useCallback((s: string) => {
    setSkill(current => (current === s ? null : s));
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  const close = useCallback(() => setOpen(null), []);
  const openShots = useCallback((title: string, shots: Shot[], start?: number) => setOpen({ title, shots, start }), []);

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top">Chase Moses</a>
          <nav aria-label="Primary">
            <a href="#ai">AI process</a>
            <a href="#work">Work</a>
            <a href="#background">Background</a>
            <a href={contact.pdf} download>PDF</a>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <p className="eyebrow">Software Engineer · Rexburg, Idaho · BYU-Idaho alumnus</p>
            <p className="print-contact">
              Chase Moses · {contact.email} · {contact.github.replace('https://', '')} · {contact.linkedin.replace('https://', '')}
            </p>
            <h1>
              I build <em>.NET</em> applications, with <em>AI agents</em> on the team.
            </h1>
            <p className="lede">
              My day runs through a dashboard I built where AI agents plan, build, and review work, and I approve every
              plan and merge every change. Below is that process, and the projects that show it: original builds of
              problems I’ve solved professionally, a client app, and the tools I use every day.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#ai">How I work with AI</a>
              <a className="button" href="#work">See the projects</a>
              <a className="button button-quiet" href={`mailto:${contact.email}`}>Email me</a>
              <a className="button button-quiet" href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="button button-quiet" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <dl className="facts">
              <div><dt>8</dt><dd>AI agents in my daily workflow</dd></div>
              <div><dt>{projects.length}</dt><dd>projects with design notes</dd></div>
              <div><dt>{totalTests}</dt><dd>automated tests, all passing</dd></div>
              <div><dt>C# · Blazor · SQL Server</dt><dd>what I work in every day</dd></div>
            </dl>
          </div>
        </section>

        <AiProcess onOpenShots={openShots} />

        <section id="work" className="work">
          <div className="container">
            <div className="section-head">
              <h2>Selected work</h2>
              <div className="filters" role="group" aria-label="Filter projects by skill">
                <button type="button" className={`chip ${skill === null ? 'chip-active' : ''}`} onClick={() => setSkill(null)}>
                  All
                </button>
                {FILTERS.map(f => (
                  <button type="button" key={f} className={`chip ${skill === f ? 'chip-active' : ''}`} onClick={() => setSkill(skill === f ? null : f)}>
                    {f}
                  </button>
                ))}
              </div>
              <p className="filter-status" aria-live="polite">
                {skill ? `${shown.length} of ${projects.length} projects use ${skill}` : ' '}
              </p>
            </div>

            {shown.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} activeSkill={skill} onSkill={pickSkill} onOpenShots={openShots} />
            ))}
          </div>
        </section>

        <section id="background" className="background">
          <div className="container">
            <h2>Background</h2>
            <dl>
              {background.map(b => (
                <div key={b.label}>
                  <dt>{b.label}</dt>
                  <dd>{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Chase Moses</span>
          <span>
            <a href={`mailto:${contact.email}`}>Email</a> · <a href={contact.github}>GitHub</a> · <a href={contact.linkedin}>LinkedIn</a> · <a href={contact.pdf} download>PDF version</a>
          </span>
        </div>
      </footer>

      {open && <Lightbox title={open.title} shots={open.shots} start={open.start} onClose={close} />}
    </>
  );
}
