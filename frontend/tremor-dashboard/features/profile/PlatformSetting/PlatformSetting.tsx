import { memo } from "react";
import isEqual from "react-fast-compare";
import { Flex, Text } from "@tremor/react";

// Types
import { AccountSettingData, ApplicationSettingData } from "@/types";

// Constants
import {
  SETTING_FIELDS_ACCOUNT,
  SETTING_FIELDS_APPLICATION,
} from "@/constants";
import dynamic from "next/dynamic";

// Components
const PlatformSettingContainer = dynamic(
  () =>
    import(
      "@/features/profile/PlatformSetting/PlatformSettingContainer/PlatformSettingContainer"
    ),
);

interface PlatformSettingProps {
  accountSettingData: AccountSettingData;
  applicationSettingData: ApplicationSettingData;
}

const PlatformSetting = ({
  accountSettingData,
  applicationSettingData,
}: PlatformSettingProps) => {
  return (
    <>
      <Text className="text-tremor-title dark:text-dark-tremor-content-title leading-relaxed font-bold tracking-[0.0075em] opacity-100 capitalize no-underline text-primary py-4">
        Platform Settings
      </Text>
      <Flex flexDirection="col" alignItems="start">
        <PlatformSettingContainer
          title="Account"
          data={accountSettingData}
          fields={SETTING_FIELDS_ACCOUNT}
        />
        <PlatformSettingContainer
          title="Application"
          data={applicationSettingData}
          fields={SETTING_FIELDS_APPLICATION}
        />
      </Flex>
    </>
  );
};

export default memo(PlatformSetting, isEqual);
