import React from "react";

const TechMarquee = () => {
  // Tech stack dengan logo URLs - menggunakan simple-icons untuk konsistensi dan kejelasan
  const techStack = [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/react.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/nodedotjs.svg",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/python.svg",
    },
    {
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/amazonaws.svg",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/docker.svg",
    },
    {
      name: "Cisco",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/cisco.svg",
    },
  ];

  // Duplicate items untuk seamless loop
  const duplicatedTech = [...techStack, ...techStack, ...techStack];

  // Render tech item
  const renderTechItem = (tech, idx, rowNum, isDuplicate = false) => (
    <div
      key={`row${rowNum}-${isDuplicate ? 'dup-' : ''}${idx}`}
      className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-neutral-800/90 border-2 border-neutral-600 rounded-full p-1.5 sm:p-2 md:p-3 hover:bg-neutral-700/90 transition-all duration-300 hover:scale-110 hover:border-neutral-500"
      title={isDuplicate ? "" : tech.name}
    >
      <img
        src={tech.logo}
        alt={isDuplicate ? "" : tech.name}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
        style={{
          filter: 'brightness(0) invert(1)',
          imageRendering: 'auto',
        }}
        loading="eager"
        crossOrigin="anonymous"
        onError={(e) => {
          // Fallback jika logo tidak bisa di-load
          console.warn(`Failed to load logo for ${tech.name}`);
          const parent = e.target.parentElement;
          if (parent && !parent.querySelector('.fallback-text')) {
            const fallback = document.createElement('div');
            fallback.className = 'fallback-text text-white text-[10px] sm:text-xs font-bold text-center w-full';
            fallback.textContent = tech.name.substring(0, 4).toUpperCase();
            parent.innerHTML = '';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );

  // Render content untuk marquee
  const renderMarqueeContent = (rowNum) => (
    <>
      {duplicatedTech.map((tech, idx) => renderTechItem(tech, idx, rowNum))}
      {/* Duplicate untuk seamless loop */}
      {duplicatedTech.map((tech, idx) => renderTechItem(tech, idx, rowNum, true))}
    </>
  );

  return (
    <div className="w-full overflow-hidden py-2 sm:py-3">
      {/* Baris pertama - bergerak ke kanan */}
      <div className="flex mb-2 sm:mb-3 overflow-hidden mask-fade-x">
        <div className="marquee-track marquee-right flex gap-4 sm:gap-6 items-center whitespace-nowrap">
          {renderMarqueeContent(1)}
        </div>
      </div>

      {/* Baris kedua - bergerak ke kiri */}
      <div className="flex overflow-hidden mask-fade-x">
        <div className="marquee-track marquee-left flex gap-4 sm:gap-6 items-center whitespace-nowrap">
          {renderMarqueeContent(2)}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;

