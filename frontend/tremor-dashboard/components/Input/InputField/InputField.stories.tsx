import type { Meta, StoryObj } from "@storybook/react";
import { FaPhoneAlt } from "react-icons/fa";

// Components
import InputField from "./InputField";

const meta = {
  title: "Components/Common/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Label of input field" },
    type: { description: "Type of input field" },
    contentPrefix: {
      description: "contentPrefix is a prop value for prefix input",
    },
    classCustomInput: {
      description:
        "classCustomInput is a prop class custom style input when have contentPrefix",
    },
    required: {
      description: "Required is type boolean use to check field is required",
    },
    placeholder: {
      description: "Show text placeholder",
    },
    errorMessage: {
      description: "Error of input field",
    },
  },
} as Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputFieldTextType: Story = {
  args: {
    label: "Input Text",
    type: "text",
    required: false,
    placeholder: "",
    errorMessage: "",
  },
};

export const InputFieldNumberType: Story = {
  args: {
    label: "Input Number",
    type: "number",
    required: false,
    placeholder: "",
    errorMessage: "",
  },
};

export const InputFieldRequired: Story = {
  args: {
    label: "Name",
    required: true,
    placeholder: "input name",
    errorMessage: "",
  },
};

export const InputFieldPrice: Story = {
  args: {
    placeholder: "0,00",
    contentPrefix: "$",
    label: "Price",
    required: false,
    errorMessage: "",
    classCustomInput: "pl-[15px]",
  },
};

export const InputFieldPhoneWithIconPrefix: Story = {
  args: {
    type: "phone",
    contentPrefix: <FaPhoneAlt />,
    placeholder: "Phone number",
    classCustomInput: "pl-[25px]",
  },
};

export const InputFieldPhoneWithTextPrefix: Story = {
  args: {
    type: "phone",
    contentPrefix: "+234",
    placeholder: "phone number",
    classCustomInput: "pl-[45px]",
  },
};

export const InputFieldURL: Story = {
  args: {
    contentPrefix: "https://",
    placeholder: "mysite",
    classCustomInput: "pl-[55px]",
  },
};
