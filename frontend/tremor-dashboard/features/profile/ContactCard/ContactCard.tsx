import { memo } from "react";

// Libs
import Link from "next/link";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "react-icons/io";
import { Flex, Text } from "@tremor/react";
import { FaPen } from "react-icons/fa";

// Constants
import { ROUTES, SOCIAL_LINKS, PREFIX_PHONE_NUMBER } from "@/constants";

// Types
import { SocialLink } from "@/types/profile";

// Utils
import { formatPhoneNumber } from "@/helpers/formatNumber";

interface ContactCardProps {
  information?: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  socials?: SocialLink;
}

const ContactCard = ({
  information = "",
  fullName,
  phone,
  email,
  location,
  socials = SOCIAL_LINKS,
}: ContactCardProps) => {
  const { facebook, twitter, instagram } = socials;

  return (
    <div>
      <Flex className="text-secondary mb-4 flex-wrap xs:flex-nowrap">
        <h3 className="text-tremor-title dark:text-dark-tremor-content-title leading-relaxed font-bold tracking-[0.0075em] opacity-100 capitalize no-underline text-primary py-4">
          Profile Information
        </h3>
        <Link className="text-xs" href={ROUTES.SETTING} aria-label="Pen">
          <FaPen />
        </Link>
      </Flex>
      <Flex
        flexDirection="col"
        className="flex-wrap items-baseline xs:flex-nowrap">
        <div
          className="text-tremor-default font-normal text-tertiary dark:text-dark-tremor-content-romance flex-wrap tracking-[0.17136px] line-clamp-4 max-h-[96px]"
          dangerouslySetInnerHTML={{ __html: information }}
        />
        <div className="h-px w-full dark:bg-gradient-divider bg-gradient-line my-4 opacity-25" />
        <Flex justifyContent="start" className="gap-3">
          <Text className="font-bold text-primary dark:text-dark-primary tracking-[0.02857em] capitalize my-2">
            Full Name:
          </Text>
          <Text className="font-normal text-tertiary dark:text-dark-tremor-content-romance">
            {fullName}
          </Text>
        </Flex>
        {phone && (
          <Flex justifyContent="start" className="gap-3">
            <Text className="font-bold text-primary dark:text-dark-primary tracking-[0.02857em] capitalize my-2">
              Mobile:
            </Text>
            <Link
              href={`tel:${phone}`}
              className="text-tremor-default font-normal text-tertiary dark:text-dark-tremor-content-romance">
              {PREFIX_PHONE_NUMBER} {formatPhoneNumber(phone)}
            </Link>
          </Flex>
        )}
        <Flex justifyContent="start" className="gap-3">
          <Text className="font-bold text-primary dark:text-dark-primary tracking-[0.02857em] capitalize my-2">
            Email:
          </Text>
          <Link href={`mailto:${email}`}>
            <Text className="font-normal text-tertiary dark:text-dark-tremor-content-romance">
              {email}
            </Text>
          </Link>
        </Flex>
        {location && (
          <Flex justifyContent="start" className="gap-3">
            <Text className="font-bold text-primary dark:text-dark-primary tracking-[0.02857em] capitalize my-2">
              Location:
            </Text>
            <Text className="font-normal text-tertiary dark:text-dark-tremor-content-romance">
              {location}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="start" className="gap-3 pr-4 py-2">
          <Text className="font-bold text-primary dark:text-dark-primary tracking-[0.02857em] capitalize">
            Social:
          </Text>
          <Flex justifyContent="start">
            <Link
              target="_blank"
              href={facebook as string}
              className="pl-1 pr-2"
              aria-label="Facebook">
              <IoLogoFacebook
                size={18}
                className="text-[#3b5998] rounded-lg stroke-2"
              />
            </Link>
            <Link
              target="_blank"
              href={twitter as string}
              className="pl-1 pr-2"
              aria-label="Twitter">
              <IoLogoTwitter size={18} className="text-[#55acee]" />
            </Link>
            <Link
              target="_blank"
              href={instagram as string}
              className="pl-1 pr-2"
              aria-label="Instagram">
              <IoLogoInstagram size={18} className="text-[#125688]" />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default memo(ContactCard);
