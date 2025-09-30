"use client";

// Libs
import { Control, Controller } from "react-hook-form";
import { ChangeEvent, DragEvent, useState } from "react";

//Types
import { IMedia } from "@/types";

// Constants
import {
  DRAG_ZONE,
  TYPE_FILE_IMAGE_REGEX,
  MESSAGES_WARNING,
} from "@/constants";

// Components
import { Text } from "@tremor/react";

interface MediaProps {
  control: Control<IMedia>;
  onUpload: (file: File) => void;
}

const Media = ({ control, onUpload }: MediaProps) => {
  const [inputStyle, setInputStyle] = useState({
    text: DRAG_ZONE.DEFAULT.TEXT,
    styleInput: DRAG_ZONE.DEFAULT.STYLE_INPUT,
    styleText: DRAG_ZONE.DEFAULT.STYLE_TEXT,
  });

  const handleDefaultDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files[0]);
    }
  };

  const handleDragImage = () => {
    setInputStyle({
      text: DRAG_ZONE.ON_DRAG.TEXT,
      styleInput: DRAG_ZONE.ON_DRAG.STYLE_INPUT,
      styleText: DRAG_ZONE.ON_DRAG.STYLE_TEXT,
    });
  };

  const handleDropFile = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const fileName = e.dataTransfer.files[0];

    if (fileName?.name.match(TYPE_FILE_IMAGE_REGEX)) {
      onUpload(fileName);
    } else {
      setInputStyle({
        text: DRAG_ZONE.ON_WRONG_FORMAT.TEXT,
        styleInput: DRAG_ZONE.ON_WRONG_FORMAT.STYLE_INPUT,
        styleText: DRAG_ZONE.ON_WRONG_FORMAT.STYLE_TEXT,
      });
    }
  };

  return (
    <Controller
      name="image"
      control={control}
      render={() => (
        <div className="flex flex-col items-center justify-center h-[calc(100%-32px)] w-full">
          <label
            onDragOver={handleDefaultDragOver}
            onDragEnter={handleDragImage}
            onDragLeave={handleDragImage}
            onDrop={handleDropFile}
            data-testid="drag-file"
            className={`flex flex-col items-center justify-center w-full h-full border ${inputStyle.styleInput} rounded-lg hover:cursor-pointer`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 mx-2">
              <Text className={`text-center ${inputStyle.styleText}`}>
                {inputStyle.text}
              </Text>
              <Text className="text-xs text-yellow-700 dark:text-yellow-500 mt-2 px-2 text-center">
                {MESSAGES_WARNING.PRODUCT.ACCEPT_IMAGE_UPLOAD}
              </Text>
            </div>
            <input
              id="dropzone-file"
              data-testid="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUploadFile}
            />
          </label>
        </div>
      )}
    />
  );
};

export default Media;
