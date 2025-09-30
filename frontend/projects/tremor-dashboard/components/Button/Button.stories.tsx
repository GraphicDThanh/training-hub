import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { TiHome } from "react-icons/ti";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VARIANT_BUTTON } from "@/constants";

const meta = {
  title: "Components/Common/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    variant: { description: "Sets the style of the button" },
    variantTremor: { description: "Sets the style of the button tremor" },
    additionalClass: { description: "Class name of the button" },
    icon: { description: "Icon of button" },
    iconPosition: { description: "Controls the position of an icon" },
    disabled: { description: "Set the state of the button to disabled" },
    type: { description: "Type of button" },
    value: { description: "Value of button" },
    children: { description: "ReactNode in button" },
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    additionalClass: "Avatar extra small",
    variant: VARIANT_BUTTON.PRIMARY,
    variantTremor: VARIANT_BUTTON.PRIMARY,
    icon: RiArrowDropDownLine,
    iconPosition: "right",
    disabled: false,
    type: "submit",
    value: "123",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    additionalClass: "",
    variant: VARIANT_BUTTON.SECONDARY,
    variantTremor: VARIANT_BUTTON.SECONDARY,
    disabled: false,
    type: "submit",
    value: "123",
    children: "Secondary",
  },
};

export const Light: Story = {
  args: {
    additionalClass: "",
    variant: VARIANT_BUTTON.LIGHT_CARD,
    variantTremor: VARIANT_BUTTON.LIGHT,
    disabled: false,
    type: "submit",
    value: "123",
    children: "Light card",
  },
};
export const Icon: Story = {
  args: {
    additionalClass: "",
    variant: VARIANT_BUTTON.LIGHT_CARD,
    variantTremor: VARIANT_BUTTON.LIGHT,
    icon: TiHome,
    disabled: false,
    type: "submit",
    value: "123",
    children: "App",
  },
};

export const Disable: Story = {
  args: {
    additionalClass: "",
    variant: VARIANT_BUTTON.PRIMARY,
    variantTremor: VARIANT_BUTTON.PRIMARY,
    disabled: true,
    type: "submit",
    value: "123",
    children: "App",
  },
};
