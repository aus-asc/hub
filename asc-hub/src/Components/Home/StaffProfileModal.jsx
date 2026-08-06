import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ROLE_LABELS = {
  senior_peer_mentor: "Senior Peer Mentor",
  peer_mentor: "Peer Mentor",
  ambassador: "Ambassador",
};

const StaffProfileModal = ({ staff, onClose }) => {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!staff) return null;

  const {
    name,
    college,
    major,
    color = "var(--color-fallback, #000000)",
    type,
    description,
    booking_link: bookingLink,
    office_hours: officeHrs,
  } = staff;

  const roleLabel =
    ROLE_LABELS[
      (type || "")
        .trim()
        .toLowerCase()
        .replace(/[\s-]+/g, "_")
    ];

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const hours =
    typeof officeHrs === "string"
      ? officeHrs
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : officeHrs || [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="text-gray-600 text-sm" />
          </button>
        </div>

        <div className="modal-scroll overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 shrink-0"
            style={{ backgroundColor: color }}
          >
            <span className="text-white text-xl font-bold tracking-wide">
              {initials}
            </span>
          </div>

          <p className="text-base font-bold text-gray-900 leading-tight mb-1">
            {name}
          </p>

          {roleLabel && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-1"
              style={{ color, backgroundColor: `${color}1A` }}
            >
              {roleLabel}
            </span>
          )}

          {(college || major) && (
            <p className="text-xs text-gray-400 mb-4">
              {college} {college && major && "·"} {major}
            </p>
          )}

          {description && (
            <p className="text-sm text-gray-600 leading-relaxed text-left border-t border-gray-100 pt-4 mb-4">
              {description}
            </p>
          )}

          {hours.length > 0 && hours[0] !== "" && (
            <div className="w-full border-t border-gray-100 pt-4 mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 mb-2 text-left">
                Office Hours
              </p>
              {hours.map((time, i) => (
                <p
                  key={i}
                  className="text-xs text-gray-500 flex items-start gap-1.5 mb-1"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block shrink-0 mt-1"
                    style={{ backgroundColor: color }}
                  />
                  {time}
                </p>
              ))}
            </div>
          )}

          {bookingLink && (
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center text-xs font-medium text-white bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] rounded-md px-3 py-2 transition-colors"
            >
              {bookingLink.startsWith("mailto") ? "Contact" : "Book Appointment"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;
