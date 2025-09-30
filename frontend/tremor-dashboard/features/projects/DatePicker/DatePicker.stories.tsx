import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// Components
import DatePicker from "./DatePicker";

const meta = {
  title: "Components/Projects/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    label: { description: "The name represent purpose use date-picker" },
    value: {
      description: "Value include dd/mm/yy that user choose to display",
    },
    minDate: { description: "Just choose from current day to future day" },
    onValueChange: { description: "Change value" },
  },
} as Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const DatePickerWithHooks = () => {
  const [date, setDate] = useState<Date>(new Date());
  const handleChangeDate = (value?: Date | null) => setDate(value as Date);
  return (
    <DatePicker
      label="Due Date"
      value={date}
      minDate={new Date()}
      onValueChange={handleChangeDate}
    />
  );
};

export const Primary: Story = {
  render: () => <DatePickerWithHooks />,
};
