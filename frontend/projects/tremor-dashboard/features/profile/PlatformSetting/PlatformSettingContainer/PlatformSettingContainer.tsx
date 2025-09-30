"use client";

import isEqual from "react-fast-compare";
import { Switch, Text } from "@tremor/react";

// Types
import {
  PlatformSetting,
  AccountSettingData,
  ApplicationSettingData,
} from "@/types";

// Contexts
import { memo } from "react";

export interface PlatformSettingContainerProps {
  fields: PlatformSetting[];
  data: AccountSettingData | ApplicationSettingData;
  title?: string;
}

const PlatformSettingContainer = ({
  fields,
  data,
  title,
}: PlatformSettingContainerProps) => (
  <>
    {title && (
      <Text className="text-xs leading-tight dark:text-dark-romance opacity-100 uppercase no-underline text-tertiary font-bold m-0 pt-4">
        {title}
      </Text>
    )}
    {fields.map(({ label, field }: PlatformSetting) => (
      <label
        className="flex items-center space-x-3 mt-1 py-3"
        key={label}
        data-testid="platformSettingContainer">
        <Switch
          tabIndex={2}
          id="switch"
          name="switch"
          className="flex justify-center items-center dark:[&>button>span]:bg-tremor-border [&>input:checked~button>span]:bg-zinc-500 dark:[&>input:checked~button>span]:bg-white"
          defaultChecked={data[field]}
        />
        <Text className="text-tertiary font-normal dark:text-dark-romance">
          {label}
        </Text>
      </label>
    ))}
  </>
);

export default memo(PlatformSettingContainer, isEqual);
