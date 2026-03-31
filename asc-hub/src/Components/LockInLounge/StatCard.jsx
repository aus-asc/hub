export default function StatCard({ icon, value, label, color, delay }) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 text-center hover:shadow-sm transition-all duration-200 anim-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-lg mb-1">{icon}</div>
      <div
        className="text-lg sm:text-xl font-bold tracking-tight anim-count"
        style={{ color, animationDelay: `${delay + 0.15}s` }}
      >
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 leading-tight">
        {label}
      </div>
    </div>
  );
}
