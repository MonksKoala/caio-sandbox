import SkillPill from '../SkillPill.jsx'
import { SKILLS } from '../../data/content.js'

export default function SkillsTab() {
  return (
    <div className="h-full tab-panel content-fade-mask p-4 md:p-6">
      <div className="space-y-4 md:space-y-5">
        {SKILLS.map(group => (
          <div key={group.category}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <SkillPill key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
