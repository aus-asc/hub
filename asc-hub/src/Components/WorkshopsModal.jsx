import { useEffect } from "react";
import { faCalendarDays, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUpcoming, categoryColors } from "../assets/utility";
import WorkshopCard from "./WorkshopCard";

const WorkshopsModal = ({ workshops, onClose }) => {
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

  const upcoming = getUpcoming(workshops);

  const grouped = upcoming.reduce((acc, ws) => {
    const key = ws.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(ws);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return 0;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="text-white text-xs"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                All Upcoming Workshops
              </h3>
              <p className="text-xs text-gray-400">
                {upcoming.length} scheduled
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="text-gray-600 text-sm" />
          </button>
        </div>

        {/* Category nav */}
        <div className="flex gap-2 px-3 sm:px-4 pt-3 pb-2 flex-wrap border-b border-gray-100">
          {sortedCategories.map((category) => {
            const colors = categoryColors[
              category
                ?.trim()
                .toLowerCase()
                .replace(/[\s-]+/g, "_")
            ] || { bg: "bg-gray-100", text: "text-gray-500" };
            return (
              <button
                key={category}
                onClick={() =>
                  document
                    .getElementById(`ws-cat-${category}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${colors.text} ${colors.bg} transition-colors cursor-pointer`}
              >
                {category}
                <span className="ml-1.5 text-[10px] text-gray-400">
                  {grouped[category].length}
                </span>
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="modal-scroll overflow-y-auto flex-1 p-3 sm:p-4 space-y-4">
          {upcoming.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">
                No upcoming workshops scheduled.
              </p>
            </div>
          ) : (
            sortedCategories.map((category) => (
              <div
                key={category}
                id={`ws-cat-${category}`}
                className="border border-gray-100 rounded-2xl p-3 sm:p-4 bg-gray-50/50"
              >
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    {category}
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    {grouped[category].length} workshop
                    {grouped[category].length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="space-y-3">
                  {grouped[category].map((ws, i) => (
                    <WorkshopCard
                      key={i}
                      title={ws.title}
                      category={ws.category}
                      facilitator={ws.facilitator}
                      datetime={ws.datetime}
                      meetLink={ws.meetLink}
                      location={ws.location}
                      week={ws.week}
                      compact
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopsModal;
