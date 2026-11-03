import type { Project, Shot } from '../data';
import { useReveal } from '../hooks';

interface Props {
  project: Project;
  index: number;
  activeSkill: string | null;
  onSkill: (skill: string) => void;
  onOpenShots: (title: string, shots: Shot[]) => void;
}

export function ProjectRow({ project, index, activeSkill, onSkill, onOpenShots }: Props) {
  const reveal = useReveal<HTMLElement>();
  const thumb = project.shots[0];

  return (
    <article ref={reveal.ref} className={`project ${reveal.className}`} id={project.id}>
      <button
        type="button"
        className={`frame ${project.fit === 'contain' ? 'frame-fit' : 'frame-browser'}`}
        onClick={() => onOpenShots(project.title, project.shots)}
        aria-label={`View screenshots of ${project.title}`}
      >
        {project.fit !== 'contain' && (
          <span className="frame-bar" aria-hidden="true">
            <i /><i /><i />
          </span>
        )}
        <img src={thumb.src} alt={thumb.alt} loading={index < 2 ? 'eager' : 'lazy'} />
        <span className="frame-hint" aria-hidden="true">
          {project.shots.length > 1 ? `View ${project.shots.length} screenshots` : 'View full size'}
        </span>
      </button>

      <div className="project-body">
        <div className="project-meta">
          <span className={`kind kind-${project.kind.split(/[ ,]/)[0].toLowerCase()}`}>{project.kind}</span>
          {project.stat && (
            <span className="stat">
              <b>{project.stat.value}</b> {project.stat.label}
            </span>
          )}
        </div>
        <h3>{project.title}</h3>
        <p className="origin">{project.origin}</p>
        <p className="summary">{project.summary}</p>
        <ul className="highlights">
          {project.highlights.map(h => <li key={h}>{h}</li>)}
        </ul>
        <div className="skills" aria-label="Skills used">
          {project.skills.map(s => (
            <button
              type="button"
              key={s}
              className={`chip ${activeSkill === s ? 'chip-active' : ''}`}
              onClick={() => onSkill(s)}
              title={`Show projects using ${s}`}
            >
              {s}
            </button>
          ))}
        </div>
        {project.privateRepo ? (
          <p className="repo-private">Private repository</p>
        ) : (
          <a className="repo-link" href={project.repo} target="_blank" rel="noreferrer">
            Read the code and design notes <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}
