import Link from "next/link";
import { InView } from "react-intersection-observer";
import { memo } from "react";

// Components
import { Flex, Title, Text } from "@tremor/react";
import { OrderStatus } from "./OrderStatus";
import { CustomImage } from "@/components";

// Constants
import { MAILTO_SUPPORT } from "@/constants";

const OrderContact = ({
  name,
  url,
  date,
  status = 0,
}: {
  name: string;
  url: string;
  date: number;
  status?: number;
}) => {
  return (
    <Flex className="flex-wrap sm:flex-nowrap order-contact">
      <Flex justifyContent="start">
        <InView>
          <div className="mr-4">
            <CustomImage
              alt={name}
              className="rounded-full"
              height={110}
              priority
              src={url}
              width={110}
            />
          </div>
        </InView>
        <Flex flexDirection="col" alignItems="start" className="py-4">
          <Title className="dark:text-dark-tremor-content-title text-primary font-semibold capitalize leading-6 tracking-wide truncate max-w-[200px] md:max-w-[240px] xl:max-w-xs 2xl:max-w-sm">
            {name}
          </Title>
          <OrderStatus status={status} period={date} />
        </Flex>
      </Flex>
      <Flex>
        <Flex flexDirection="col" alignItems="end">
          <a
            href={`mailto: ${MAILTO_SUPPORT}`}
            className="rounded-lg bg-gradient-primary dark:bg-gradient-pickled shadow-btn-primary dark:shadow-btn-primary hover:shadow-btn-primary-hover dark:hover:shadow-btn-primary-hover antialiased min-w-[64px] text-center uppercase sm:px-[20px] px-3 py-[10px] leading-[17px] tracking-[0.35px] text-xs font-bold text-white dark:text-dark-primary">
            Contact us
          </a>
          <Text className="mt-3 text-sm text-tertiary dark:text-dark-romance font-light opacity-100 text-right leading-[21px] w-full">
            Do you like the product? Leave us a review{" "}
            <Link href="#" className="font-semibold underline">
              here
            </Link>
            .
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(OrderContact);
