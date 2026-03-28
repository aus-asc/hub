const LinkCard = ({ title, icon, link, color = "#00000" }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:shadow-md transition-all duration-200 text-center"
    >
      {/* Icon circle */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
        style={{ backgroundColor: `${color}` }}
      >
        <i className={`text-white text-sm fa ${icon}`} />
      </div>
      <p className="text-xs font-semibold text-gray-700 leading-tight">
        {title}
      </p>
    </a>
  );
};

export default LinkCard;
