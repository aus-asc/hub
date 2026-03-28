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
import { categoryColors } from "../assets/utility";

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
    ? start.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;
  const formattedTime = start
    ? start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : null;

  return (
    <div
      className={`relative bg-white border rounded-2xl flex flex-col gap-3 transition-all duration-200 hover:shadow-md h-full
      ${isLive ? "border-[#4a9e6d] ring-1 ring-[#4a9e6d]/30" : "border-gray-100"}
      ${compact ? "p-4" : "p-5"}
    `}
    >
      {/* Live badge */}
      {isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#4a9e6d] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-[6px] animate-pulse"
          />
          Live Now
        </div>
      )}

      {/* Category badge */}
      {category && (
        <span
          className={`inline-flex self-start text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
        >
          {category}
        </span>
      )}

      {/* Title */}
      <h4
        className={`font-bold text-gray-900 leading-snug ${compact ? "text-xs" : "text-sm"}`}
      >
        {title}
      </h4>

      {/* Meta */}
      <div className="space-y-1.5 flex-1">
        {facilitator && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FontAwesomeIcon icon={faUser} className="w-3 shrink-0" />
            <span>{facilitator}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FontAwesomeIcon icon={faClock} className="w-3 shrink-0" />
            <span>
              {formattedDate} · {formattedTime}
            </span>
          </div>
        )}
        {/* Location */}
        {location && location != "" && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FontAwesomeIcon icon={faLocationDot} className="w-3 shrink-0" />
            <span>{location}</span>
          </div>
        )}

        {/* Week number */}
        {week && week != "" && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FontAwesomeIcon icon={faHashtag} className="w-3 shrink-0" />
            <span>Week {week}</span>
          </div>
        )}
      </div>

      {/* Join button */}
      {meetLink && !isPast && (
        <a
          href={meetLink}
          className={`mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3.5 py-2 rounded-full self-start transition-colors
            ${isLive ? "bg-[#4a9e6d] hover:bg-[#3d8c60]" : "bg-gray-900 hover:bg-gray-700"}
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
