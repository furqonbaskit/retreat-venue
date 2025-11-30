import React from "react";
import CustomImage from "./CustomImage";

interface ServiceCardProps {
  imageSrc?: string;
  title: string;
  location: string;
  address: string;
  capacity: number;
  price: number;
  onBookClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  title,
  location,
  address,
  price,
  capacity,
  onBookClick,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          {imageSrc ? (
            <CustomImage
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-300 dark:bg-zinc-600">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-4 sm:p-6">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-zinc-50 mb-1">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 mb-3">
              {location}
            </p>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">
              📍 {address}
            </p>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
              👥 Capacity: {capacity}
            </p>
          </div>

          {/* Footer with Price and Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200 dark:border-zinc-700">
            <div className="text-lg sm:text-xl font-semibold text-purple-600 dark:text-purple-400">
              ${price.toFixed(2)}
              <span className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-normal">/day</span>
            </div>
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto py-2 px-6 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 font-semibold text-white rounded-lg transition-colors"
            >
              Book Venue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;