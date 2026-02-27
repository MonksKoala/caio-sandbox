import { Send, FileText } from 'lucide-react'

const TABS = [
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Send },
]

export default function TabNav({ active, onChange }) {
  return (
    <nav className="tab-nav flex gap-2 p-3 md:p-4 border-b border-ink/10 bg-offwhite/50 shrink-0">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 md:flex-none flex items-center justify-center gap-1.5
                      h-10 md:h-9 px-4 rounded-full font-mono text-[11px] uppercase tracking-widest
                      transition-colors duration-200
                      ${active === tab.id
                        ? 'bg-ink text-offwhite'
                        : 'text-ink/40 hover:text-ink hover:bg-paper/60'}`}
        >
          <tab.icon size={12} />
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
