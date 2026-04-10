export default function RankBadge({ rank }) {
  const styles = {
    1: "bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] text-white shadow-[0_2px_6px_rgba(200,161,53,.3)]",
    2: "bg-gradient-to-br from-[var(--color-silver)] to-[var(--color-silver-light)] text-white shadow-sm",
    3: "bg-gradient-to-br from-[var(--color-bronze)] to-[var(--color-bronze-light)] text-white shadow-sm",
  };
  return (
    <div
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 ${
        styles[rank] || "bg-gray-100 text-gray-400"
      }`}
    >
      {rank}
    </div>
  );
}
