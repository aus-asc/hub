import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const DropDownList = ({
  title,
  listContent,
  accentColor = "border-[#3d8cc4]",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group cursor-pointer"
      >
        <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
          {title}
        </span>
        <span
          className={`w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-gray-400 text-xs"
          />
        </span>
      </button>

      {/* Dropdown items */}
      {isOpen && listContent && (
        <div className={`border-t-2 ${accentColor} divide-y divide-gray-50`}>
          {listContent.map((item) => (
            <a
              href={item.link}
              key={item.title}
              target="_blank"
              className="flex items-start justify-between gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 mb-0.5">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-gray-300 text-xs mt-1 flex-shrink-0 group-hover:text-gray-500 transition-colors"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownList;
