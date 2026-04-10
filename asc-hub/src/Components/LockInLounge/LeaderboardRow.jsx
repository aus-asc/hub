import RankBadge from "./RankBadge";
import { formatHours, getStreakBadge } from "../../scripts/LockInLounge/utils";
import { CONFIG } from "../../scripts/LockInLounge/config";

export default function LeaderboardRow({ entry, delay }) {
  const rank = Math.round(entry.rank);
  const badge = getStreakBadge(entry.streak);
  const qualifies = entry.duration * 60 >= CONFIG.MIN_DURATION_MINUTES;
  const hasBoosted = entry.boosted_hours > 0;

  return (
    <div
      className={`flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-gray-50 last:border-b-0 transition-colors hover:bg-gray-50/60 anim-fade-up ${
        rank <= 3 ? "bg-[var(--color-gold)]/2" : ""
      } ${!qualifies ? "opacity-40" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <RankBadge rank={rank} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-xs sm:text-sm ${
              rank <= 3 ? "font-bold" : "font-semibold"
            } text-gray-900 truncate`}
          >
            {entry.name}
          </span>
          {badge && (
            <span className="text-[9px] sm:text-[10px] font-bold text-[var(--color-red)] bg-[var(--color-red)]/10 px-1.5 py-0.5 rounded-md anim-streak">
              {badge.icon} {Math.round(entry.streak)}d
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <p className="text-[10px] sm:text-xs text-gray-400">
            {Math.round(entry.number_of_sessions)} session
            {entry.number_of_sessions !== 1 ? "s" : ""} ·{" "}
            {formatHours(entry.duration)}
          </p>
          {hasBoosted && (
            <span className="text-[9px] sm:text-[10px] font-semibold text-[var(--color-green)] bg-[var(--color-green)]/10 px-1.5 py-0.5 rounded-md">
              ⚡ {formatHours(entry.boosted_hours)} boosted
            </span>
          )}
          {!qualifies && (
            <span className="text-[9px] sm:text-[10px] text-gray-400 italic">
              below minimum
            </span>
          )}
        </div>
      </div>

      <div className="text-right">
        <span
          className={`text-sm sm:text-base font-bold tabular-nums ${
            rank === 1
              ? "text-[var(--color-gold)]"
              : rank === 2
                ? "text-gray-500"
                : rank === 3
                  ? "text-[var(--color-bronze)]"
                  : "text-[var(--color-green)]"
          }`}
        >
          {Math.round(entry.display_score)} pts
        </span>
      </div>
    </div>
  );
}
