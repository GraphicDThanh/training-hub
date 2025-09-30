import React from "react";

// Components
import { Flex } from "@tremor/react";
import { LoadingIndicator } from "@/components";

const OverlayPage = () => {
  return (
    <Flex
      className="absolute inset-0 z-10 bg-white opacity-50 dark:bg-slate-500 transition-opacity rounded-lg"
      alignItems="center"
      justifyContent="center">
      <LoadingIndicator
        additionalClass="min-h-[500px] flex justify-center items-center"
        width={8}
        height={8}
        isFullWidth={false}
        fillColor="river-bed-500"
      />
    </Flex>
  );
};

export default OverlayPage;
