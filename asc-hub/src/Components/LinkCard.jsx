const LinkCard = ({ title, icon, link, color = "#000000" }) => {
  console.log(icon);
  return (
    <a
      href={link}
      target="_blank"
      className="group bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-2.5 hover:shadow-md transition-all duration-200 text-center"
    >
      {/* Icon circle */}
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0"
        style={{ backgroundColor: color }}
      >
        <i
          className={`text-white text-xs sm:text-sm ${icon.includes("instagram") ? `fab ${icon}` : `fa ${icon}`}`}
        />
      </div>
      <p className="text-[10px] sm:text-xs font-semibold text-gray-700 leading-tight">
        {title}
      </p>
    </a>
  );
};

export default LinkCard;
