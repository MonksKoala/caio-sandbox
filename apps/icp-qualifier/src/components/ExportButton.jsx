import { Download } from 'lucide-react';

export default function ExportButton({ onClick, disabled, count }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-magnetic bg-ink text-offwhite font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-xl disabled:opacity-30 flex items-center gap-3 hover:opacity-90 transition-opacity"
    >
      <Download size={14} strokeWidth={2} />
      Export CSV
      {count != null && (
        <span className="bg-offwhite/20 text-offwhite font-mono text-[10px] rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </button>
  );
}
