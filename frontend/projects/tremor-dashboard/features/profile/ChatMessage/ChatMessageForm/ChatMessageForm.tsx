"use client";

import { memo, useCallback } from "react";
import { Flex } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";

// Constants
import { VARIANT_BUTTON } from "@/constants";

// Types
import { Message } from "@/types";

// Icons
import { IoIosSend } from "react-icons/io";

// Components
import { Button, InputField } from "@/components";

const ChatMessageForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => Promise<void>;
}) => {
  const { control, handleSubmit, reset } = useForm<Message>({
    defaultValues: { message: "" },
  });

  const handleSendMessage = useCallback(
    async (value: Message) => {
      const message = value.message.trim();

      if (!message) return;

      reset({ message: "" });

      await onSendMessage(message);
    },
    [reset, onSendMessage],
  );

  return (
    <form id="sendMessageForm" onSubmit={handleSubmit(handleSendMessage)}>
      <Flex className="items-center gap-3 p-3 bg-greyish dark:bg-primary">
        <Controller
          name="message"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputField
              id="message"
              placeholder="Type message"
              value={value}
              onChange={onChange}
              data-testid="chat-message-input"
            />
          )}
        />
        <Button
          type="submit"
          variant={VARIANT_BUTTON.SECONDARY}
          data-testid="conversation-sent-btn"
          additionalClass="bg-transparent border-0 p-0 dark:bg-transparent dark:hover:bg-transparent">
          <IoIosSend className="text-xl text-primary dark:text-white " />
        </Button>
      </Flex>
    </form>
  );
};

export default memo(ChatMessageForm);
