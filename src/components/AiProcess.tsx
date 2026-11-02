import { example, lessons, loop, practices, type Shot } from '../data';
import { useReveal } from '../hooks';

interface Props {
  onOpenShots: (title: string, shots: Shot[], start?: number) => void;
}

export function AiProcess({ onOpenShots }: Props) {
  const intro = useReveal<HTMLDivElement>();
  const loopReveal = useReveal<HTMLOListElement>();
  const exampleReveal = useReveal<HTMLDivElement>();
  const lessonsReveal = useReveal<HTMLDivElement>();
  const practicesReveal = useReveal<HTMLDivElement>();

  return (
    <section id="ai" className="ai">
      <div className="container">
        <div ref={intro.ref} className={`ai-intro ${intro.className}`}>
          <p className="eyebrow">How I work with AI</p>
          <h2>I run AI agents the way a good team runs development.</h2>
          <p className="lede">
            Clear tasks, approved plans, independent review, and a person who decides what ships. I run this loop every
            day on a platform I built, and it’s how I think about AI at work too: the speed is real, and so is the need
            to check what comes back.
          </p>
        </div>

        <ol ref={loopReveal.ref} className={`loop ${loopReveal.className}`} aria-label="The agent loop">
          {loop.map((step, i) => (
            <li key={step.title} className={step.gate ? 'loop-step loop-gate' : 'loop-step'}>
              <span className="loop-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {step.gate && <p className="gate"><span aria-hidden="true">◆</span> {step.gate}</p>}
            </li>
          ))}
        </ol>

        <div ref={exampleReveal.ref} className={`example ${exampleReveal.className}`}>
          <div className="example-text">
            <p className="kicker">A real example</p>
            <h3>{example.title}</h3>
            <p>{example.text}</p>
            <button type="button" className="button" onClick={() => onOpenShots(example.title, example.shots)}>
              See the review trail
            </button>
          </div>
          <div className="example-shots">
            {example.shots.map((shot, i) => (
              <button
                type="button"
                key={shot.src}
                className="example-shot"
                onClick={() => onOpenShots(example.title, example.shots, i)}
                aria-label={`Open: ${shot.alt}`}
              >
                <img src={shot.src} alt={shot.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div ref={lessonsReveal.ref} className={`keep-together ${lessonsReveal.className}`}>
          <h3 className="ai-subhead">Loop engineering: when the loop fails, I fix the loop</h3>
          <p className="ai-subtext">
            Agents make mistakes the same way people do, so a better prompt is rarely enough. Each of these came from
            the dashboard’s real history and became a rule, enforced by code or instructions, with a test behind it.
          </p>
          <div className="lessons">
            {lessons.map(l => (
              <div key={l.happened} className="lesson">
                <p className="lesson-label">What happened</p>
                <p>{l.happened}</p>
                <p className="lesson-label lesson-label-fix">What changed</p>
                <p>{l.changed}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={practicesReveal.ref} className={practicesReveal.className}>
          <h3 className="ai-subhead">Where it shows up</h3>
          <div className="practices">
            {practices.map(p => (
              <div key={p.title} className="practice">
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
