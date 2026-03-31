import { CONFIG } from "../../scripts/LockInLounge/config";

export default function Sidebar() {
  return (
    <div className="space-y-4">
      {/* Multiplier */}
      <div
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm transition-all duration-200 anim-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#c8a135]/10 flex items-center justify-center text-sm shrink-0">
            ✨
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
              1.5x Multiplier
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
              Study during peer-led slots to boost your time. Mentors are on
              duty
              <strong className="text-gray-600"> 2–4 PM</strong> and
              <strong className="text-gray-600"> 7–9 PM</strong> daily.
            </p>
          </div>
        </div>
      </div>

      {/* Streaks */}
      <div
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm transition-all duration-200 anim-fade-up"
        style={{ animationDelay: "0.35s" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 mb-3">
          Streak Badges
        </p>
        <div className="space-y-3">
          {CONFIG.STREAK_THRESHOLDS.map((t) => (
            <div key={t.days} className="flex items-center gap-3">
              <span className="text-base w-6 text-center">{t.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-700">{t.label}</p>
                <p className="text-[10px] text-gray-400">
                  {t.days}+ consecutive days
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm transition-all duration-200 anim-fade-up"
        style={{ animationDelay: "0.4s" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 mb-3">
          How It Works
        </p>
        <div className="space-y-3">
          {[
            "Join the Lock-in Lounge Google Meet during open hours.",
            `Study for at least ${CONFIG.MIN_DURATION_MINUTES} minutes to appear on the board.`,
            "Join during mentor hours (2–4 PM or 7–9 PM) for a 1.5x boost.",
            "Come back daily to build a streak and earn badges.",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3d8cc4]/10 flex items-center justify-center text-[10px] font-bold text-[#3d8cc4] shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
