"use client";

// Libs
import { memo } from "react";

// Components
import { Avatar } from "@/components";

// Constants
import { PARTICIPANTS_NUMBER_PROJECT } from "@/constants";

// Types
import { AvatarCard } from "@/types";

// Helpers
import { cn } from "@/helpers";

/**
 * Primary UI component for Avatar group component
 */

interface AvatarsProps {
  className?: string;
  height: number;
  width: number;
  totalParticipantsShow?: number;
  participantsData: AvatarCard[];
}

const Avatars = ({
  className = "",
  totalParticipantsShow = PARTICIPANTS_NUMBER_PROJECT,
  height,
  width,
  participantsData,
}: AvatarsProps): JSX.Element => {
  const length = participantsData.length;
  return (
    <>
      {participantsData
        ?.slice(0, totalParticipantsShow)
        .map((participant: AvatarCard, index: number) => {
          const { id = "34", avatar } = participant;
          const showMultiAvatars = length > totalParticipantsShow;
          const showNumberLastAvatar =
            index === totalParticipantsShow - 1 && showMultiAvatars;
          const lastItemClasses = {
            "last:relative last:overflow-visible last:bg-black last:dark:bg-primary last:after:content-[attr(after-dynamic-value)] last:after:block last:after:text-white last:after:absolute last:after:left-1/2 last:after:-translate-x-1/2 last:after:top-1/2 last:after:-translate-y-1/2 last:after:z-10 last:after:text-[9px]":
              showMultiAvatars,
          };
          return (
            <Avatar
              key={`avatar-${id}`}
              alt={`${
                showNumberLastAvatar
                  ? `+${length - totalParticipantsShow - 1}`
                  : `Avatar ${id}`
              }`}
              className={cn(
                {
                  "border-primary dark:border-white [&>*]:hidden":
                    showNumberLastAvatar,
                  "border-white": !showNumberLastAvatar,
                },
                "first:ml-0 border-2 border-solid ml-[-10px]",
                lastItemClasses,
                className,
              )}
              height={height}
              width={width}
              priority
              src={avatar}
            />
          );
        })}
    </>
  );
};

export default memo(Avatars);
