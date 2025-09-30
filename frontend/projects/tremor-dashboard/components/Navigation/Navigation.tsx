"use client";

import { memo } from "react";
import { Text } from "@tremor/react";
import Link from "next/link";

// Helpers
import { cn } from "@/helpers";

// Types
import { INavigation } from "@/types";

interface NavigationProps {
  items: INavigation[];
  isRow?: boolean;
}

const Navigation = ({ isRow = false, items }: NavigationProps) => {
  const baseClasses =
    "flex dark:bg-dark-tremor-primary border-solid shadow-box-icon-default rounded-xl w-500 bg-white p-4";
  const navClasses = cn(baseClasses, {
    "flex-col": !isRow,
  });

  return (
    <ul className={navClasses} data-testid="list-navigation">
      {items.map(({ label, href, icon }) => (
        <li
          key={label}
          className="px-4 py-2.5 hover:bg-select rounded-tremor-small dark:text-white dark:hover:bg-slate-600">
          <Link href={href}>
            <div className="flex gap-6">
              {icon}
              <Text className="capitalize font-primary text-primary">
                {label}
              </Text>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(Navigation);
