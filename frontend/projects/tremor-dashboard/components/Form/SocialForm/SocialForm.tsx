// Libs
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components";
import { Flex, Text } from "@tremor/react";
import SocialField from "../SocialField/SocialField";

// Types
import { SocialFormData, TFieldSocial } from "@/types";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface SocialFormProps {
  socialUrls: TFieldSocial[];
  isLoading?: boolean;
  errorMessage?: string;
  onBack: () => void;
  onSubmit: (social: SocialFormData) => void;
  isLastStep?: boolean;
}

const SocialForm = ({
  socialUrls,
  isLoading,
  errorMessage,
  onBack,
  onSubmit,
  isLastStep,
}: SocialFormProps) => {
  const socials = socialUrls.reduce(
    (prev, { name, value }) => ({ ...prev, [name]: value }),
    {},
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ [key: string]: string }>({
    defaultValues: socials,
    mode: "onBlur",
  });

  const renderSocials = socialUrls.map(({ id, label, name, value }) => (
    <SocialField
      key={id}
      control={control}
      id={id}
      name={name}
      label={label}
      value={value}
    />
  ));

  const renderTextButton = isLastStep ? "Send" : "Next";

  return (
    <form
      id="social-form"
      className="w-full mt-20"
      onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-primary dark:text-white font-bold text-xl mb-8">
        Socials
      </h6>
      {errorMessage && (
        <div>
          <Text className="text-md text-red-500 dark:text-red-500 mb-8">
            Please review these error then try again: {errorMessage}
          </Text>
        </div>
      )}
      {renderSocials}
      <Flex className="mt-6">
        <Button
          variant={VARIANT_BUTTON.SURFACE}
          onClick={onBack}
          disabled={isSubmitting || isLoading}>
          <Text className="uppercase font-bold text-xs text-gray-900 dark:text-black tracking-wide">
            Back
          </Text>
        </Button>
        <Button
          variant={VARIANT_BUTTON.PRIMARY_CENTER}
          disabled={isSubmitting || isLoading}
          additionalClass="items-end mt-0"
          type="submit">
          <Text className="uppercase font-bold text-xs text-white dark:text-white tracking-wide">
            {renderTextButton}
          </Text>
        </Button>
      </Flex>
    </form>
  );
};

export default SocialForm;
