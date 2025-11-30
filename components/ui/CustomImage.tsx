import React from "react";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
}

const CustomImage: React.FC<ImageProps> = ({
  src,
  alt,
  width = 300,
  height = 200,
  className = "",
  priority = false,
  fill = false,
  objectFit = "cover",
}) => {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
        objectFit={objectFit}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
};

export default CustomImage;