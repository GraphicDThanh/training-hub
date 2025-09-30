// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import Modal from "./Modal";

const meta = {
  title: "Components/Common/Modal",
  tags: ["autodocs"],
  component: Modal,
  argTypes: {
    id: { description: "id of modal" },
    title: { description: "title of modal" },
    children: { description: "content children type ReactNode of modal" },
    open: { description: "status open (true/faile) of modal" },
    showCloseIconBtn: {
      description: "status show or not show icon close of modal",
    },
    showBtnCloseLabel: {
      description: "status show or not show close button of modal",
    },
    additionalClasses: { description: "class custom style of modal" },
    btnCloseLabel: { description: "content text button close of modal" },
    btnPrimaryLabel: { description: "content text button Submit of modal" },
    btnSecondaryLabel: { description: "content text button Done of modal" },
    onClose: { description: "call close of modal" },
    onClickPrimaryBtn: { description: "call submit of modal" },
    onClickSecondaryBtn: { description: "call done of modal" },
    primaryBtnDisabled: {
      description: "status disable Submit button of modal",
    },
    secondaryBtnDisabled: {
      description: "status disable Done button of modal",
    },
  },
} as Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryLabelModal: Story = {
  args: {
    title: "Title Modal",
    open: true,
    showCloseIconBtn: false,
    showBtnCloseLabel: true,
    additionalClasses: "",
    btnPrimaryLabel: "Confirm",
    btnSecondaryLabel: "",
    onClickPrimaryBtn: () => {},
    onClose: () => {},
    children: <div>Content Modal</div>,
  },
};

export const SecondaryLabelModal: Story = {
  args: {
    title: "Title Modal",
    open: true,
    showCloseIconBtn: true,
    showBtnCloseLabel: true,
    additionalClasses: "",
    btnPrimaryLabel: "",
    btnSecondaryLabel: "Submit",
    onClickPrimaryBtn: () => {},
    onClose: () => {},
    children: <div>Content Modal</div>,
  },
};
