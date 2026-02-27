export default function StatusDot({ label = 'Available for projects', active = true }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 pulse-dot' : 'bg-ink/20'}`}
      />
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink/50">
        {label}
      </span>
    </div>
  )
}
