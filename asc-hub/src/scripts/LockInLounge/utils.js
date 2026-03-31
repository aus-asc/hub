import { CONFIG } from "./config";

// API durations are in hours → readable string
export function formatHours(hours) {
  if (!hours || hours <= 0) return "0m";
  const totalMins = hours * 60;
  if (totalMins < 1) return "<1m";
  if (totalMins < 60) return `${Math.round(totalMins)}m`;
  const h = Math.floor(totalMins / 60);
  const m = Math.round(totalMins % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// peak_hour is a 0–23 integer from the API
export function formatPeakHour(h) {
  if (h === null || h === undefined) return "--";
  const hour = Math.round(h);
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
}

export function getStreakBadge(streak) {
  if (!streak || streak < CONFIG.STREAK_THRESHOLDS[0].days) return null;
  for (const t of [...CONFIG.STREAK_THRESHOLDS].reverse()) {
    if (streak >= t.days) return t;
  }
  return null;
}

export function getDateLabel(view) {
  const now = new Date();
  if (view === "today")
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dubai",
    });
  if (view === "week") return "This Week";
  return "All Time";
}
