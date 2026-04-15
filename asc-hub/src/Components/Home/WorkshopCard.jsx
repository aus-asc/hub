import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faClock,
  faUser,
  faCircle,
  faLocationDot,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { categoryColors } from "../../scripts/Home/utility";

/**
 * datetime: ISO string e.g. "2025-04-03T15:00:00"
 * durationMinutes: how long the workshop runs (default 60)
 * compact: smaller padding/text for modal list
 */
const WorkshopCard = ({
  title,
  category,
  facilitator,
  datetime,
  meetLink,
  location,
  week,
  durationMinutes = 60,
  compact = false,
}) => {
  const colors = categoryColors[
    category
      ?.trim()
      .toLowerCase()
      .replace(/[\s-]+/g, "_")
  ] || {
    bg: "bg-gray-100",
    text: "text-gray-500",
  };

  const now = new Date();
  const start = datetime ? new Date(datetime) : null;
  const end = start
    ? new Date(start.getTime() + durationMinutes * 60000)
    : null;

  const isLive = start && now >= start && now <= end;
  const isPast = end && now > end;

  const formattedDate = start
    ? `${start.toLocaleDateString("en-AE", {
        month: "short",
        timeZone: "Asia/Dubai",
      })} ${start.toLocaleDateString("en-AE", {
        day: "numeric",
        timeZone: "Asia/Dubai",
      })}, ${start.toLocaleDateString("en-AE", {
        weekday: "short",
        timeZone: "Asia/Dubai",
      })}`
    : null;

  const formattedTime = start
    ? start.toLocaleTimeString("en-AE", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Dubai",
      })
    : null;

  return (
    <div
      className={`relative bg-white border rounded-2xl flex flex-col gap-3 transition-all duration-200 hover:shadow-md h-full
        ${isLive ? "border-[var(--color-green)] ring-1 ring-[var(--color-green)]/30" : "border-gray-100"}
        ${compact ? "p-3 sm:p-4" : "p-4 sm:p-5"}
      `}
    >
      {/* Live badge */}
      {isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[var(--color-green)] text-white text-[10px] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-1 rounded-full">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-[6px] animate-pulse"
          />
          <span className="hidden xs:inline">Live Now</span>
        </div>
      )}

      {/* Category badge */}
      {category && (
        <span
          className={`inline-flex self-start text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
        >
          {category}
        </span>
      )}

      {/* Title */}
      <h4
        className={`font-bold text-gray-900 leading-snug ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"}`}
      >
        {title}
      </h4>

      {/* Meta */}
      <div className="space-y-1.5 flex-1">
        {facilitator && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
            <FontAwesomeIcon icon={faUser} className="w-3 shrink-0" />
            <span className="truncate">{facilitator}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
            <FontAwesomeIcon icon={faClock} className="w-3 shrink-0" />
            <span>
              {formattedDate} · {formattedTime}
            </span>
          </div>
        )}
        {location && location !== "" && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
            <FontAwesomeIcon icon={faLocationDot} className="w-3 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {week && week !== "" && (
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
            <FontAwesomeIcon icon={faHashtag} className="w-3 shrink-0" />
            <span>Week {week}</span>
          </div>
        )}
      </div>

      {/* Join button */}
      {meetLink && !isPast && (
        <a
          href={meetLink}
          className={`mt-1 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full self-start transition-colors
            ${isLive ? "bg-[var(--color-green)] hover:bg-[var(--color-green-hover))]" : "bg-gray-900 hover:bg-gray-700"}
          `}
        >
          <FontAwesomeIcon icon={faVideo} className="text-[10px]" />
          {isLive ? "Join Now" : "Join Online"}
        </a>
      )}
    </div>
  );
};

export default WorkshopCard;
