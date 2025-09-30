"use client";

// Components
import {
  IdentifyField,
  CustomDateFormat,
  CustomAvatarName,
  DataGrid,
} from "@/components";

import { Text } from "@tremor/react";

// Types
import { User, ColumnType } from "@/types";

// Constants
import { ROUTES, GENDERS } from "@/constants";

// Helper
import { formatNewDate, formatPhoneNumber } from "@/helpers";

interface TableUserProps {
  users: User[];
  total: number;
}

// User Table Props
const columns: ColumnType<User>[] = [
  {
    key: "id",
    title: "Id",
    customNode: (_, { id }) => (
      <IdentifyField id={id} link={`${ROUTES.USERS}/${id}`} />
    ),
  },
  {
    key: "name",
    title: "User Name",
    customNode: (_, { name, avatar }) => (
      <CustomAvatarName avatar={avatar} text={name} enableMagnify />
    ),
    isSortable: true,
  },
  {
    key: "email",
    title: "Email",
    customNode: (_, { email }) => (
      <a href={`mailto:${email}`}>
        <Text className="text-xs text-tertiary dark:text-lighter font-semibold w-[180px] truncate">
          {email}
        </Text>
      </a>
    ),
    isSortable: true,
  },
  {
    key: "gender",
    title: "Gender",
    customNode: (_, { gender }) => (
      <Text className="text-xs text-tertiary dark:text-lighter font-semibold">
        {gender !== null &&
          GENDERS.find(item => item.value === gender.toString())?.option}
      </Text>
    ),
  },
  {
    key: "location",
    title: "Location",
    customNode: (_, { location }) => (
      <Text className="text-xs text-tertiary dark:text-lighter font-semibold max-w-[200px] truncate">
        {location}
      </Text>
    ),
  },
  {
    key: "phoneNumber",
    title: "Phone Number",
    customNode: (_, { phoneNumber }) => {
      const phoneNumberFormat = formatPhoneNumber(phoneNumber);

      return (
        phoneNumberFormat && (
          <a href={`tel:${phoneNumberFormat}`} aria-label="User's phone number">
            <Text className="text-xs text-tertiary dark:text-lighter font-semibold w-[100px]">
              {phoneNumberFormat}
            </Text>
          </a>
        )
      );
    },
  },
  {
    key: "birthday",
    title: "Birthday",
    customNode: (_, { birthday }) => (
      <Text className="text-xs text-tertiary dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] w-[90px] truncate">
        {birthday && formatNewDate(birthday)}
      </Text>
    ),
  },
  {
    key: "createdAt",
    title: "Created Date",
    customNode: (_, { createdAt }) => <CustomDateFormat date={createdAt} />,
    isSortable: true,
  },
];

const TableUser = ({ users, total }: TableUserProps) => {
  return (
    <DataGrid
      data={users}
      columns={columns}
      total={total}
      search={{
        field: "query",
        param: "page",
        valueParam: "1",
        placeholder: "Search by user name",
      }}
    />
  );
};

export default TableUser;
