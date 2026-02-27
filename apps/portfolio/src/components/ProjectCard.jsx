import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project }) {
  const statusColors = {
    live: 'bg-green-500',
    wip: 'bg-amber-400',
    archived: 'bg-ink/20',
  }

  const statusLabels = {
    live: 'Live',
    wip: 'In Progress',
    archived: 'Archived',
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group block bg-paper/50 border border-ink/10 rounded-[1.5rem] p-4 md:p-5 hover-lift hover:border-signal/40 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-heading font-semibold text-sm text-ink">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-ink/30">{project.year}</span>
          <ArrowUpRight
            size={14}
            className="text-ink/30 group-hover:text-signal group-hover:rotate-12 transition-all duration-300"
          />
        </div>
      </div>

      <div className="w-8 h-px bg-signal/30 mb-2" />

      <p className="font-heading text-xs text-ink/50 leading-relaxed mb-3 line-clamp-2">
        {project.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-widest bg-ink/5 border border-ink/10 rounded-full px-2 py-0.5 text-ink/40"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`} />
          <span className="font-mono text-[9px] uppercase tracking-widest text-ink/30">
            {statusLabels[project.status]}
          </span>
        </div>
      </div>
    </a>
  )
}
