// Components
import Image from "next/image";
import { Text, Title } from "@tremor/react";
import { Button } from "@/components";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface PreviewImageProps {
  filename: string;
  url: string;
  onRemove: () => void;
}

const ImagePreview = ({ filename, url, onRemove }: PreviewImageProps) => {
  if (!url) {
    return null;
  }

  return (
    <div>
      <Title className="font-bold dark:text-white">Preview Image</Title>
      <div className={`relative h-[350px] mb-6 mx-auto`}>
        <Image
          className="max-w-full my-4 object-scale-down"
          src={url}
          alt="Uploaded image"
          fill
          priority
          quality={40}
        />
      </div>
      <Text className="text-tremor-title text-black dark:text-white">
        {filename}
      </Text>
      <Button
        additionalClass="mt-2 rounded-lg dark:bg-gradient-pickled py-3 px-6 bg-gradient-btn-back hover:dark:bg-gradient-pickled border-none dark:text-white dark:hover:text-white text-center box-shadow-transparent"
        onClick={onRemove}
        variantTremor={VARIANT_BUTTON.LIGHT}>
        <Text className="uppercase font-bold text-xs text-gray-900 dark:text-white tracking-wide">
          Remove Image
        </Text>
      </Button>
    </div>
  );
};

export default ImagePreview;
