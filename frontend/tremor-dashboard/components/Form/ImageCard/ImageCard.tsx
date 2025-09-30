import { ChangeEvent } from "react";

// Constants
import { VARIANT_BUTTON, MESSAGES_WARNING } from "@/constants";

// Components
import Image from "next/image";
import { Title, Text, Flex, Card } from "@tremor/react";
import { LoadingIndicator, Button } from "@/components";

const ImageCard = ({
  name,
  desc,
  image,
  disabled = false,
  onRemoveImage,
  onUpload,
  isUpload = false,
}: {
  name: string;
  desc: string;
  image: string;
  disabled?: boolean;
  isUpload?: boolean;
  onRemoveImage: () => void;
  onUpload: (file: File) => void;
}): JSX.Element => {
  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full bg-tremor-primary dark:bg-dark-tremor-primary group overflow-visible p-4 border-none ring-0 md:even:mr-0 md:last:mr-0 lg:even:mr-6 analytics-info">
      <Flex
        alignItems="start"
        flexDirection="col"
        justifyContent="start"
        className="-mt-10">
        <Flex className="relative">
          {isUpload ? (
            <div className="w-full h-52 md:h-80 rounded-lg bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
              <LoadingIndicator
                width={5}
                height={5}
                fillColor="river-bed-500"
              />
              <span className="mt-3 dark:text-white">Loading...</span>
            </div>
          ) : image ? (
            <div className="relative w-full h-[350px] z-10 rounded-xl m-auto shadow-lg shadow-slate-300 dark:shadow-slate-900 bg-white">
              <Image
                className="rounded-xl object-scale-down"
                src={image}
                alt={name}
                fill
                priority
                quality={40}
              />
            </div>
          ) : (
            <div className="bg-greyish w-full h-full">
              <Text className="text-sm md:text-lg text-primary dark:text-black py-40 text-center">
                No image available
              </Text>
            </div>
          )}
        </Flex>
        <Flex flexDirection="col" className="pt-7">
          <Flex justifyContent="center">
            <div className="antialiased text-center uppercase bg-gradient-primary dark:bg-gradient-pickled rounded-lg border-0 shadow-btn-primary hover:shadow-btn-primary-hover px-3 py-2 cursor-pointer leading-[17px] tracking-[0.35px]">
              <label className="uppercase text-xs font-bold text-white cursor-pointer">
                Change Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleUploadFile}
                />
              </label>
            </div>

            <Button
              type="button"
              additionalClass="antialiased p-2 text-center uppercase text-xs bg-secondary dark:bg-gradient-pickled rounded-md border border-red-500 hover:border-red-500 dark:border-attention hover:dark:border-attention hover:bg-transparent hover:opacity-75 mx-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onRemoveImage}
              disabled={disabled}
              variantTremor={VARIANT_BUTTON.LIGHT}>
              <Text className="text-xs font-bold text-danger dark:text-danger uppercase">
                Remove Image
              </Text>
            </Button>
          </Flex>
          <Text className="text-xs text-yellow-700 dark:text-yellow-500 mt-2 text-center h-[32px]">
            {MESSAGES_WARNING.PRODUCT.ACCEPT_IMAGE_UPLOAD}
          </Text>
          <Title className="w-full font-primary tracking-normal text-primary dark:text-dark-primary text-lg text-center leading-snug capitalize mt-4 mb-2">
            {name}
          </Title>
          <div
            className="text-sm text-primary dark:text-white flex-wrap text-tremor-title font-light leading-[26px] tracking-[0.17136px] text-center lg:text-base line-clamp-4 h-[96px]"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ImageCard;
