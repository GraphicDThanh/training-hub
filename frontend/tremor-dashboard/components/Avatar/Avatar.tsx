"use client";

import { memo } from "react";

// Components
import { CustomImage } from "@/components";
import { ImageProps } from "next/image";

// Helpers
import { cn } from "@/helpers";

/**
 * Primary UI component for Avatar component
 */
const Avatar = ({
  className = "",
  priority = true,
  ...res
}: ImageProps): JSX.Element => {
  const { src, alt } = res;

  return (
    <div
      after-dynamic-value={alt}
      className={cn(
        "inline-flex shadow-box-avatar rounded-full justify-center items-center overflow-hidden",
        className,
      )}>
      {src ? (
        <CustomImage
          priority={priority}
          className={`object-cover ${className}`}
          {...res}
        />
      ) : (
        <p
          className={cn(
            "flex justify-center items-center text-white text-md bg-gray-500 rounded-full uppercase",
            className,
          )}>
          {alt.substring(0, 1)}
        </p>
      )}
    </div>
  );
};

export default memo(Avatar);
