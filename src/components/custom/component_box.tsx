import React from 'react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface componentProps {
  imageUrl?: string;
  featureName: string;
  className?: string;
  first?: boolean;
}

const ComponentBox = ({ imageUrl, featureName, className, first }: componentProps) => {
  return (
    <div
      className={cn(
        "border border-dashed border-gray-300/40 cursor-pointer bg-transparent flex flex-col justify-center items-start p-6 w-full h-full transition-all duration-200 hover:border-gray-300/60",
        className
      )}
    >
      <div className="w-full">
        {imageUrl && (
          <div className="mb-4 w-fit">
            <img src={imageUrl} alt="feature icon" className={cn(" object-contain opacity-80", first ? "w-24" : "w-8")} />
          </div>
        )}
        <h3 className={cn("text-gray-200 font-normal leading-relaxed",
          first ? "text-2xl" : "text-base"
        )}>
          {featureName}
        </h3>
      </div>
    </div >
  );
};

export default ComponentBox;
