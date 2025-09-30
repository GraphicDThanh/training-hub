import { twMerge } from "tailwind-merge";

// Components
import {
  DatePickerProps,
  DatePickerValue,
  DatePicker as TremorDatePicker,
} from "@tremor/react";

// Css
import "@/styles/project.css";

interface IDatePicker extends DatePickerProps {
  label: string;
  additionalClasses?: string;
  value: Date;
  onValueChange: (value: DatePickerValue | null) => void;
  minDate?: Date;
}

const DatePicker = ({
  label,
  additionalClasses,
  value,
  onValueChange,
  minDate,
  ...rest
}: IDatePicker) => {
  const handleChange = (value?: DatePickerValue) => {
    onValueChange(value ?? null);
  };

  return (
    <>
      <label
        htmlFor="dueDate"
        className="text-gray-500 text-sm dark:text-gray-400 after:content-['*'] after:text-red-500 after:text-md">
        {label}
      </label>
      <TremorDatePicker
        value={value}
        onValueChange={handleChange}
        minDate={minDate}
        {...rest}
        className={`date-picker ${twMerge(
          "pt-3 [&>button]:!pl-2 py-2",
          additionalClasses,
        )}`}
      />
    </>
  );
};

export default DatePicker;
