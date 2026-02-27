import SkillPill from '../SkillPill.jsx'
import { EXPERIENCE, SKILLS, PROJECTS, HERO } from '../../data/content.js'

export default function CvTab() {
  return (
    <div className="h-full p-4 md:p-6 flex flex-col overflow-y-auto md:overflow-hidden">
      {/* Header */}
      <div className="cv-item shrink-0 mb-4">
        <h2 className="font-drama italic text-3xl md:text-4xl text-ink leading-tight">
          Curriculum Vitae
        </h2>
        <p className="font-mono text-[11px] text-ink/40 uppercase tracking-widest mt-1">
          {HERO.name} &mdash; {HERO.title}
        </p>
      </div>

      {/* Divider */}
      <div className="cv-item shrink-0 border-t border-ink/10 mb-4" />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1 md:overflow-hidden">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 md:overflow-y-auto">
          {/* Experience section */}
          <section className="cv-item">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-3">
              Experience
            </h3>
            <div className="flex flex-col gap-4">
              {EXPERIENCE.map(exp => (
                <div key={exp.id} className="cv-item">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-heading font-semibold text-sm text-ink leading-snug">
                        {exp.role}
                      </p>
                      <p className="font-mono text-[10px] text-ink/50 mt-0.5">
                        {exp.domain}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-signal uppercase tracking-widest shrink-0">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                        <span className="font-mono text-[10px] text-ink/60 leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills section */}
          <section className="cv-item">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-3">
              Skills
            </h3>
            <div className="flex flex-col gap-3">
              {SKILLS.map(skillGroup => (
                <div key={skillGroup.category} className="cv-item">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink/20 block mb-1">
                    {skillGroup.category}
                  </span>
                  <div className="flex flex-wrap">
                    {skillGroup.items.map(item => (
                      <span key={item} className="mr-1 mb-1">
                        <SkillPill label={item} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 md:overflow-y-auto">
          {/* Work Samples section */}
          <section className="cv-item">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-3">
              Work Samples
            </h3>
            <div className="flex flex-col gap-2">
              {PROJECTS.map(project => (
                <a
                  key={project.id}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-item bg-paper/50 border border-ink/10 rounded-xl p-3 hover-lift hover:border-signal/40 transition-colors block"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-heading font-semibold text-sm text-ink">
                      {project.title}
                    </span>
                    <span className="font-mono text-[10px] text-ink/30 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-ink/50 leading-relaxed line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] uppercase tracking-wider bg-ink/5 border border-ink/10 rounded-full px-2 py-0.5 text-ink/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
