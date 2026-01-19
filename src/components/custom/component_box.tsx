import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

interface componentProps {
  imageUrl?: string;
  featureName: string;
  className?: string;
}

const ComponentBox = ({ imageUrl, featureName, className }: componentProps) => {
  return (
    <div
      className={cn(
        "group relative border border-gray-800 bg-gradient-to-br from-gray-900/20 to-black/40 cursor-pointer backdrop-blur-sm flex flex-col justify-start items-start p-4 sm:p-5 md:p-6 w-full h-full overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1",
        className
      )}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 via-blue-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, white 40%, transparent 50%)'
        }}
      />

      <div className="relative z-10 w-full">
        {imageUrl && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 w-fit group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <img src={imageUrl} alt="feature icon" className="h-6 w-6 sm:h-7 sm:w-7 object-contain" />
          </div>
        )}
        <h3 className="text-gray-100 text-sm sm:text-base md:text-lg font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
          {featureName}
        </h3>

        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-800/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </div>
  );
};

export default ComponentBox;
