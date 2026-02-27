export default function SkillPill({ label }) {
  return (
    <span className="skill-pill inline-block font-mono text-[11px] bg-paper border border-ink/10 rounded-full px-3 py-1 text-ink/70">
      {label}
    </span>
  )
}
