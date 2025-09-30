"use client";

import { useFormContext } from "react-hook-form";

// Components
import { Title, Flex, Card } from "@tremor/react";

//Styles
import "@/styles/products.css";

// Hooks
import useFocusFieldError from "@/hooks/useFocusFieldError";

// Types
import { TFieldSocial } from "@/types";

// Components
import SocialField from "@/components/Form/SocialField/SocialField";

const SocialsCard = ({ socialUrls }: { socialUrls: TFieldSocial[] }) => {
  const { control, formState } = useFormContext();

  useFocusFieldError(formState);

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

  return (
    <Card className="dark:bg-dark-tremor-primary ring-0 p-4">
      <Title className="mb-6 font-primary font-bold text-primary dark:text-dark-primary text-xl leading-snug capitalize">
        Socials
      </Title>
      <Flex flexDirection="col" alignItems="start" justifyContent="start">
        {renderSocials}
      </Flex>
    </Card>
  );
};

export default SocialsCard;
