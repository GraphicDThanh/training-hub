import { memo } from "react";

// Components
import { Text } from "@tremor/react";
import { Avatar } from "@/components";

// Constants
import { USER_ROLE } from "@/types";

interface ProfileInfoProps {
  name: string;
  role: USER_ROLE | string;
  avatarUrl: string;
  isProject?: boolean;
}

const ProfileInfo = ({
  name,
  role,
  avatarUrl,
  isProject,
}: ProfileInfoProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
      <div
        className={`flex flex-col xs:flex-row xs:items-center flex-wrap profile-info ${
          isProject ? "my-1" : "mb-3 -mt-3 -ml-2"
        }`}>
        <Avatar
          alt={`${name} avatar`}
          className="shadow-lg w-[50px] h-[50px]"
          height={50}
          priority
          src={avatarUrl}
          width={50}
        />
        <div className="py-4 ml-6" data-testid="profile-info-lg">
          <h2 className="font-semibold text-xl text-primary dark:text-dark-primary capitalize">
            {name}
          </h2>
          <Text className="font-normal text-tertiary dark:text-dark-romance">
            {role}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileInfo);
