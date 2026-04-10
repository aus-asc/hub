import { formatHours, getStreakBadge } from "../../scripts/LockInLounge/utils";

const PODIUM_COLORS = {
  1: {
    avatar: "var(--color-gold)",
    ring: "ring-[var(--color-gold)]/30",
    text: "text-[var(--color-gold)]",
    bar: "bg-[var(--color-gold)]/8 border-[var(--color-gold)]/20",
  },
  2: {
    avatar: "var(--color-silver)",
    ring: "ring-gray-300/40",
    text: "text-gray-500",
    bar: "bg-gray-100 border-gray-200/60",
  },
  3: {
    avatar: "var(--color-bronze)",
    ring: "ring-[var(--color-bronze)]/30",
    text: "text-[var(--color-bronze)]",
    bar: "bg-[var(--color-bronze)]/8 border-[var(--color-bronze)]/20",
  },
};

export default function Podium({ top3 }) {
  if (!top3 || top3.length < 3) return null;

  const order = [1, 0, 2]; // silver | gold | bronze
  const heights = ["h-20 sm:h-24", "h-28 sm:h-32", "h-16 sm:h-20"];

  return (
    <div
      className="flex items-end justify-center gap-2 sm:gap-3 px-4 pt-6 pb-1 anim-fade-up"
      style={{ animationDelay: "0.2s" }}
    >
      {order.map((idx, pos) => {
        const entry = top3[idx];
        const rank = idx + 1;
        const c = PODIUM_COLORS[rank];
        const badge = getStreakBadge(entry.streak);
        const initials = entry.name.replace(/\./g, "").toUpperCase();

        return (
          <div key={idx} className="flex flex-col items-center w-24 sm:w-28">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mb-1.5 ring-2 ${c.ring}`}
              style={{ backgroundColor: c.avatar }}
            >
              {initials}
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-900 text-center leading-tight truncate w-full px-1">
              {entry.name.split(" ")[0]}
            </p>
            {/* Score — primary */}
            <p
              className={`text-sm sm:text-base font-bold ${c.text} mt-0.5 leading-tight`}
            >
              {Math.round(entry.display_score)} pts
            </p>
            {/* Duration — secondary */}
            <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">
              {formatHours(entry.duration)}
            </p>
            {badge && <span className="text-xs mt-0.5">{badge.icon}</span>}
            <div
              className={`w-full ${heights[pos]} ${c.bar} rounded-t-xl border border-b-0 mt-1.5 flex items-start justify-center pt-2`}
            >
              <span className={`text-base sm:text-lg font-bold ${c.text}`}>
                {rank === 1 ? "👑" : rank}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
