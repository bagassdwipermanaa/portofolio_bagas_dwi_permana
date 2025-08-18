import React from "react";

const DiagonalMarquee = ({
  items = [],
  backgroundClass = "bg-white",
  textClass = "text-black",
  dotClass = "bg-orange-500",
  dotShapeClass = "rounded-full",
  rotate = -15,
  className = "",
  height = "h-16",
  speedClass = "marquee-slow",
}) => {
  const repeatedItems = Array.from({ length: 10 }).flatMap(() => items);
  const content = (
    <div className="flex items-center">
      {repeatedItems.map((label, idx) => (
        <div
          key={`${label}-${idx}`}
          className={`flex items-center gap-3 px-8 ${textClass} font-space tracking-wider text-sm md:text-base`}
        >
          <span className="uppercase">{label}</span>
          <span
            className={`inline-block w-2 h-2 ${dotShapeClass} ${dotClass}`}
          ></span>
        </div>
      ))}
    </div>
  );
  return (
    <div
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-[140vw] z-10 ${height} ${className}`}
      style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
    >
      <div
        className={`overflow-hidden ${backgroundClass} ${height} w-full shadow-2xl/20 mask-fade-x`}
      >
        <div
          className={`marquee-track ${speedClass} flex whitespace-nowrap ${height}`}
        >
          {content}
          <div aria-hidden className="flex items-center">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagonalMarquee;
