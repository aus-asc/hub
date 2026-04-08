const EmployeeCard = ({
  name,
  college,
  major,
  officeHrs,
  color = "#000000",
  bookingLink,
  meetingLink,
}) => {
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

  // Parses "Monday 11:00 AM - 12:00 PM" into { dayIndex, startMinutes, endMinutes }
  const parseOfficeHour = (str) => {
    const DAYS = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const match = str.match(
      /^(\w+)\s+(\d{1,2}):(\d{2})\s*(AM|PM)\s*[-–]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i,
    );
    if (!match) return null;

    const [, day, sh, sm, sAmPm, eh, em, eAmPm] = match;
    const dayIndex = DAYS.indexOf(day.toLowerCase());
    if (dayIndex === -1) return null;

    const toMinutes = (h, m, ampm) => {
      let hour = parseInt(h);
      if (ampm.toUpperCase() === "PM" && hour !== 12) hour += 12;
      if (ampm.toUpperCase() === "AM" && hour === 12) hour = 0;
      return hour * 60 + parseInt(m);
    };

    return {
      dayIndex,
      startMinutes: toMinutes(sh, sm, sAmPm),
      endMinutes: toMinutes(eh, em, eAmPm),
    };
  };

  const isInOfficeHours = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return hours.some((slot) => {
      const parsed = parseOfficeHour(slot);
      if (!parsed) return false;
      return (
        parsed.dayIndex === currentDay &&
        currentMinutes >= parsed.startMinutes &&
        currentMinutes < parsed.endMinutes
      );
    });
  };
  console.log(meetingLink);
  const officeOpen = meetingLink ? isInOfficeHours() : false;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all duration-200 group flex flex-col">
      {/* Avatar */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-3 sm:mb-4 shrink-0"
        style={{ backgroundColor: color }}
      >
        <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
          {initials}
        </span>
      </div>

      {/* Info */}
      <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight mb-0.5">
        {name}
      </p>

      {(college || major) && (
        <p className="text-[10px] sm:text-xs text-gray-400 mb-3">
          {college} {college && major && "·"} {major}
        </p>
      )}

      {/* Office hours */}
      {hours.length > 0 && hours[0] !== "" && (
        <div className="border-t border-gray-50 pt-3 mt-auto space-y-1">
          {/* Live badge — shown only when currently in office hours */}
          {officeOpen && (
            <div className="flex items-center gap-1.5 mb-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: color }}
                />
              </span>
              <span className="text-[10px] font-semibold text-green-600">
                Office open now
              </span>
            </div>
          )}

          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 mb-2">
            Office Hours
          </p>
          {hours.map((time, i) => (
            <p
              key={i}
              className="text-[10px] sm:text-xs text-gray-500 flex items-start gap-1.5"
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block shrink-0 mt-0.5"
                style={{ backgroundColor: color }}
              />
              {time}
            </p>
          ))}
        </div>
      )}

      {/* Join Meeting — only visible during office hours */}
      {meetingLink && officeOpen && (
        <a
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block w-full text-center text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded-md px-3 py-1.5 transition-colors"
        >
          Join Meeting
        </a>
      )}

      {/* Book Appointment — always visible if link exists */}
      {bookingLink && (
        <a
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block w-full text-center text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-md px-3 py-1.5 transition-colors"
        >
          {bookingLink.startsWith("mailto") ? "Contact" : "Book Appointment"}
        </a>
      )}
    </div>
  );
};

export default EmployeeCard;
