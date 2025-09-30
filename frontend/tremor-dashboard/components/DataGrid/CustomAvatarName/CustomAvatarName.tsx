"use client";

import Modal from "@/components/Modal/Modal";
// Constants
import { NOT_FOUND_IMAGE } from "@/constants";

// Components
import { Text } from "@tremor/react";
import Image from "next/image";
import { useState } from "react";

interface CustomAvatarNameProps {
  avatar?: string;
  text: string;
  enableMagnify?: boolean;
}

const CustomAvatarName = ({
  avatar,
  text,
  enableMagnify,
}: CustomAvatarNameProps) => {
  const [avatarURL, setAvatarURL] = useState(avatar ?? NOT_FOUND_IMAGE);
  const [isMagnify, setIsMagnify] = useState(false);

  const handleInvalidImage = () => {
    setAvatarURL(NOT_FOUND_IMAGE);
  };

  const handleMagnify = () => {
    setIsMagnify(prev => !prev);
  };

  const Container = enableMagnify ? "button" : "div";

  return (
    <div className="flex justify-start items-center gap-2">
      <Container className="relative h-6 w-6" onClick={handleMagnify}>
        <Image
          src={avatarURL || NOT_FOUND_IMAGE}
          alt={`${text} avatar`}
          fill
          sizes="24px"
          className="object-cover rounded-full"
          onError={handleInvalidImage}
        />
      </Container>

      {enableMagnify && isMagnify && (
        <Modal
          additionalClasses="w-[100%] gap-5 pb-0 dark:bg-dark-tremor-primary"
          showCloseIconBtn
          showBtnCloseLabel={false}>
          <Image
            src={avatarURL}
            alt="avatar"
            width={700}
            height={400}
            className="object-fill p-2"
          />
        </Modal>
      )}

      <Text className="text-xs text-tertiary dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] capitalize order-customer w-[200px] truncate">
        {text}
      </Text>
    </div>
  );
};
export default CustomAvatarName;
