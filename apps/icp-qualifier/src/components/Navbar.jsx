import { Plus } from 'lucide-react';

export default function Navbar({ showNew, onNew }) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-paper/80 backdrop-blur-xl border border-ink/10 rounded-full px-6 py-3 flex items-center justify-between gap-8">
      <span className="font-mono text-xs uppercase tracking-widest">
        ICP QUALIFIER
      </span>

      <div className="flex items-center gap-3">
        {showNew && (
          <button
            onClick={onNew}
            className="flex items-center gap-1.5 bg-signal text-offwhite font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            <Plus size={12} strokeWidth={2.5} />
            New Prospect
          </button>
        )}
      </div>
    </nav>
  );
}
