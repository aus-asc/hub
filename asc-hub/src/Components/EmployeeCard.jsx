import React from "react";

const EmployeeCard = ({
  name,
  college,
  major,
  officeHrs,
  color = "#00000",
  bookingLink,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  officeHrs = officeHrs
    .split(",") // split by comma
    .map((item) => item.trim()); // remove extra spaces

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200 group">
      {/* Avatar */}
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center mb-4`}
        style={{ backgroundColor: `${color}` }}
      >
        <span className="text-white text-sm font-bold tracking-wide">
          {initials}
        </span>
      </div>

      {/* Info */}
      <p className="text-sm font-bold text-gray-900 leading-tight mb-0.5">
        {name}
      </p>

      {(college || major) && (
        <p className="text-xs text-gray-400 mb-3">
          {college} {college && major && "·"} {major}
        </p>
      )}

      {/* Office hours */}
      {officeHrs && officeHrs.length > 0 && officeHrs[0] != "" && (
        <div className="border-t border-gray-50 pt-3 mt-3 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-2">
            Office Hours
          </p>
          {officeHrs.map((time, i) => (
            <p
              key={i}
              className="text-xs text-gray-500 flex items-center gap-1.5"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full inline-block shrink-0`}
                style={{ backgroundColor: `${color}` }}
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
          className="mt-3 inline-block w-full text-center text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-md px-3 py-1.5 transition-colors"
        >
          Book Appointment
        </a>
      )}
    </div>
  );
};

export default EmployeeCard;
