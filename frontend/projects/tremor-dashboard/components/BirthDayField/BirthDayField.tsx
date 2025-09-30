"use client";

// Utils
import { generateDays, generateTimes } from "@/helpers/time";

// Helpers
import { cn } from "@/helpers";

// constants
import { MONTHS } from "@/constants";

// Types
import { BirthDay } from "@/types";

// Components
import { SelectField } from "@/components";
import { Text } from "@tremor/react";

interface BirthdayProps {
  value: BirthDay;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: BirthDay) => void;
}

const BirthDayField = ({
  value,
  errorMessage = "",
  disabled = false,
  required = false,
  onChange,
}: BirthdayProps) => {
  const { months, date, years } = value ?? { months: "", date: 0, years: 0 };
  const currentYear = new Date();

  const handleChangeMonth = (optionValue: string) => {
    onChange({ ...value, months: Number(optionValue) });
  };

  const handleChangeDay = (optionValue: string) => {
    onChange({ ...value, date: Number(optionValue) });
  };

  const handleChangeYear = (optionValue: string) => {
    onChange({ ...value, years: Number(optionValue) });
  };

  return (
    <>
      <Text
        className={cn("text-grey text-sm dark:text-lighter capitalize", {
          "after:content-['*'] after:text-red-500 after:text-md": required,
        })}>
        Birth date
      </Text>
      <div className="flex flex-col md:flex-row gap-6">
        <SelectField
          data-testid="year"
          value={String(years)}
          disabled={disabled}
          placeholder="Select Year"
          options={generateTimes(1900, currentYear.getFullYear())}
          onChange={handleChangeYear}
        />
        <SelectField
          data-testid="month"
          value={String(months)}
          disabled={disabled}
          placeholder="Select Month"
          options={MONTHS}
          onChange={handleChangeMonth}
        />
        <SelectField
          data-testid="date"
          value={String(date)}
          disabled={disabled}
          placeholder="Select Day"
          options={generateDays(Number(months), years)}
          onChange={handleChangeDay}
        />
      </div>

      {errorMessage && (
        <Text className="text-xs text-red-500 dark:text-red-500 pt-2">
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export default BirthDayField;
