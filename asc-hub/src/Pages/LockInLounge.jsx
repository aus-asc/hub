import { useState, useEffect, useMemo } from "react";
import "../css/LockInLounge/LockInLounge.css";
import { CONFIG, TABS } from "../scripts/LockInLounge/config";
import {
  formatHours,
  formatPeakHour,
  getDateLabel,
} from "../scripts/LockInLounge/utils";
import { ACTIONS, callAPI } from "../api";
import Podium from "../Components/LockInLounge/Podium";
import StatCard from "../Components/LockInLounge/StatCard";
import LeaderboardRow from "../Components/LockInLounge/LeaderboardRow";
import Sidebar from "../Components/LockInLounge/Sidebar";
import Spinner from "../Components/LockInLounge/Spinner";
import ErrorState from "../Components/LockInLounge/ErrorState";
import ascLogo from "../assets/asc-logo.jpg";
import ausLogo from "../assets/aus-logo.png";
import { Footer } from "../Components/Footer";
import { Link } from "react-router-dom";

export default function LockInLounge() {
  const [view, setView] = useState("today");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError(false);

    callAPI({ method: "GET", action: ACTIONS.LOCK_IN_LOUNGE })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const periodData = useMemo(() => {
    if (!data) return null;
    return data[view] || null;
  }, [data, view]);

  const leaderboard = useMemo(() => {
    if (!periodData || !Array.isArray(periodData.rankings)) return [];
    return [...periodData.rankings].sort((a, b) => a.rank - b.rank);
  }, [periodData]);

  const qualifiedTop3 = useMemo(
    () =>
      leaderboard
        .filter((e) => e.duration * 60 >= CONFIG.MIN_DURATION_MINUTES)
        .slice(0, 3),
    [leaderboard],
  );

  const stats = useMemo(() => {
    if (!periodData)
      return {
        totalHours: 0,
        longestHours: 0,
        participants: 0,
        peakHour: null,
      };
    return {
      totalHours: periodData.total_duration || 0,
      longestHours: periodData.longest_session || 0,
      participants: periodData.participants || 0,
      peakHour: periodData.peak_hour,
    };
  }, [periodData]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* NAV */}
      <nav className="bg-white border-b-4 border-[var(--color-burgundy)] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img
                src={ausLogo}
                alt="AUS Logo"
                className="h-9 sm:h-10 object-contain"
              />
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <img
                src={ascLogo}
                alt="ASC Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-[var(--color-maroon)] leading-tight hidden sm:block font-medium">
                  American University of Sharjah
                </p>
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  Academic Support Center
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="text-xs sm:text-sm text-[var(--color-blue)] font-medium hover:underline"
          >
            ← Back to Hub
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[var(--color-blue)] mb-3">
            Lock-in Lounge
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Who's locking in the{" "}
            <span className="text-[var(--color-gold)]">most?</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mb-5">
            Join the virtual study room, stay focused and climb the leaderboard.
            Study during peer-led sessions to earn a 1.5x time multiplier.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse inline-block" />
              Open daily {CONFIG.LOUNGE_HOURS}
            </div>
            <span className="text-gray-300 hidden sm:inline">·</span>
            <span className="text-xs sm:text-sm text-gray-400">
              {getDateLabel(view)}
            </span>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8">
          {TABS.map(([v, label]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                view === v
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 sm:mb-8">
          <StatCard
            icon="⏱"
            value={formatHours(stats.totalHours)}
            label="Total Study Time"
            color="var(--color-green)"
            delay={0.05}
          />
          <StatCard
            icon="🏆"
            value={formatHours(stats.longestHours)}
            label="Longest Session"
            color="var(--color-gold)"
            delay={0.1}
          />
          <StatCard
            icon="👥"
            value={Math.round(stats.participants)}
            label="Participants"
            color="var(--color-blue)"
            delay={0.15}
          />
          <StatCard
            icon="📍"
            value={formatPeakHour(stats.peakHour)}
            label="Peak Hour"
            color="var(--color-red)"
            delay={0.2}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {/* LEADERBOARD */}
          <div className="lg:col-span-2 space-y-4">
            {/* Podium — only when 3+ qualified students exist */}
            {!loading && !error && qualifiedTop3.length >= 3 && (
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200">
                <Podium top3={qualifiedTop3} />
              </div>
            )}

            <div
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 anim-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="px-4 sm:px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    {view === "today"
                      ? "Today's Rankings"
                      : view === "week"
                        ? "Weekly Rankings"
                        : "All-Time Rankings"}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    Min. {CONFIG.MIN_DURATION_MINUTES} minutes to qualify
                  </p>
                </div>
                {!loading && !error && leaderboard.length > 0 && (
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {leaderboard.length} student
                    {leaderboard.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {loading ? (
                <Spinner />
              ) : error ? (
                <ErrorState onRetry={fetchData} />
              ) : leaderboard.length > 0 ? (
                leaderboard.map((entry, i) => (
                  <LeaderboardRow
                    key={`${entry.name}-${i}`}
                    entry={entry}
                    delay={0.35 + i * 0.04}
                  />
                ))
              ) : (
                <div
                  className="py-14 text-center anim-fade-up"
                  style={{ animationDelay: "0.35s" }}
                >
                  <div className="text-3xl mb-3">🔒</div>
                  <p className="text-sm font-bold text-gray-700 mb-1">
                    No sessions yet
                  </p>
                  <p className="text-xs text-gray-400">
                    {view === "today"
                      ? "Be the first to lock in today!"
                      : "Sessions will appear here once students join."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <Sidebar />
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
