import { Download, Trash2 } from 'lucide-react';
import ScoreCard from './ScoreCard';

export default function HistoryPanel({ history = [], activeId, onSelect, onExport, onClear }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-sm text-ink">
          History
        </h2>
        {history.length > 0 && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 bg-ink/5 rounded-full px-2 py-0.5">
            {history.length}
          </span>
        )}
      </div>

      {history.length === 0 ? (
        <div className="border border-ink/10 rounded-xl p-6 text-center">
          <p className="font-mono text-xs text-ink/30 uppercase tracking-widest">
            No prospects scored yet
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {history.map((entry) => (
              <ScoreCard
                key={entry.id}
                entry={entry}
                isActive={entry.id === activeId}
                onClick={() => onSelect(entry.id)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onExport}
              className="flex-1 flex items-center justify-center gap-2 bg-ink text-offwhite font-mono text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl hover:bg-ink/90 transition-colors"
            >
              <Download size={12} strokeWidth={2} />
              Export
            </button>
            <button
              onClick={onClear}
              className="flex items-center justify-center gap-2 border border-ink/10 text-ink/40 font-mono text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl hover:border-signal/30 hover:text-signal transition-colors"
            >
              <Trash2 size={12} strokeWidth={2} />
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}
