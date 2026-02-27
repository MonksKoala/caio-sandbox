import ProjectCard from '../ProjectCard.jsx'
import { PROJECTS } from '../../data/content.js'

export default function WorkTab() {
  return (
    <div className="h-full tab-panel content-fade-mask p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
