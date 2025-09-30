"use client";

// Constants
import { VARIANT_BUTTON } from "@/constants";

// Components
import { Button } from "@/components";
import { Text } from "@tremor/react";

const ErrorPage = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <main className="flex flex-col inset-0 items-center justify-center min-h-screen -mt-[130px]">
      <h2 className="text-sm lg:text-lg text-center text-tremor-content-title dark:text-dark-tremor-content-title my-2">
        Something went wrong!
      </h2>
      <Button
        variant={VARIANT_BUTTON.PRIMARY}
        type="submit"
        size="xs"
        onClick={reset}
        additionalClass="antialiased text-center uppercase px-6 py-2.5 rounded-lg border-0 items-end">
        <Text className="items-center uppercase py-[2px] text-xs font-bold font-primary text-white dark:text-dark-tremor-content-title">
          Try again
        </Text>
      </Button>
    </main>
  );
};

export default ErrorPage;
