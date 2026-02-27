function relativeTime(dateString) {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function scoreBadgeStyle(score) {
  if (score >= 80) return 'bg-signal text-offwhite';
  if (score >= 60) return 'bg-amber-400 text-ink';
  return 'bg-ink/50 text-offwhite';
}

export default function ScoreCard({ entry, isActive, onClick }) {
  const { prospect, result, scoredAt } = entry;
  const score = result?.score ?? 0;
  const tier = result?.qualificationTier ?? '';
  const industry = prospect?.industry ?? '';
  const company = prospect?.companyName ?? 'Unknown';

  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-4 cursor-pointer hover-lift transition-colors ${
        isActive
          ? 'border-signal/30 bg-signal/5'
          : 'border-ink/10 bg-offwhite'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-heading font-semibold text-sm text-ink truncate">
            {company}
          </p>
          <p className="font-mono text-xs text-ink/40 mt-0.5 truncate">
            {industry}
          </p>
        </div>

        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold ${scoreBadgeStyle(score)}`}
        >
          {score}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
          {tier}
        </span>
        <span className="font-mono text-[10px] text-ink/30">
          {relativeTime(scoredAt)}
        </span>
      </div>
    </div>
  );
}
