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
        "border border-dashed border-gray-300/40 cursor-pointer bg-transparent flex flex-col justify-start items-start p-6 w-full h-full transition-all duration-200 hover:border-gray-300/60",
        className
      )}
    >
      <div className="w-full">
        {imageUrl && (
          <div className="mb-4 w-fit">
            <img src={imageUrl} alt="feature icon" className="h-8 w-8 object-contain opacity-80" />
          </div>
        )}
        <h3 className="text-gray-200 text-base font-normal leading-relaxed">
          {featureName}
        </h3>
      </div>
    </div>
  );
};

export default ComponentBox;
