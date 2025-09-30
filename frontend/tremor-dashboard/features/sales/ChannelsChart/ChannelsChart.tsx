import { DonutChart, Card, Flex, Text } from "@tremor/react";
import { MdOutlinePriorityHigh } from "react-icons/md";

//Components
import { Button, Popover } from "@/components";

// Constants
import { COLOR_CHANNELS_CHART, VARIANT_BUTTON } from "@/constants";

//Helpers
import { numberWithCommas } from "@/helpers";

//Styles
import "@/styles/charts.css";

interface DataProps {
  id: number;
  name: string;
  percent: number;
}

interface ChannelChartDataProps {
  sale_total: number;
  sale_social_media: number;
  channels: DataProps[];
}

interface ChannelChartProps {
  title: string;
  channelChartData: ChannelChartDataProps;
}

const ChannelChart = ({ title, channelChartData }: ChannelChartProps) => {
  const { sale_total, sale_social_media, channels } = channelChartData;

  return (
    <Card className="p-5 ring-0 border-none rounded-xl shadow-md dark:bg-dark-tremor-primary">
      <Flex alignItems="start" flexDirection="col">
        <Flex className="relative">
          <h2 className="text-sm md:text-base font-bold text-primary dark:text-dark-primary">
            {title}
          </h2>
          <Popover
            content="See traffic channels"
            className="text-center !bg-black !bottom-[-50px] rounded-md !text-white right-[-34px] md:right-[-55px] min-w-[140px] before:content-['▲'] before:absolute before:top-[-17px] before:left-[85px] md:before:left-[65px] before:text-[black]">
            <Button
              variant={VARIANT_BUTTON.SECONDARY}
              variantTremor={VARIANT_BUTTON.SECONDARY}
              aria-label="Traffic Channels Button">
              <MdOutlinePriorityHigh className="text-xs text-secondary" />
            </Button>
          </Popover>
        </Flex>
        <Flex className="my-8">
          <Flex className="p-4 w-7/12">
            <DonutChart
              className="h-[200px]"
              data={channels}
              index="name"
              category="percent"
              variant="pie"
              colors={[
                "royal-blue-500",
                "amaranth-500",
                "cod-gray-500",
                "river-bed-500",
              ]}
              showAnimation={true}
            />
          </Flex>
          <Flex className="w-5/12">
            <ul>
              {channels?.map(item => {
                const { id, name } = item;
                return (
                  <li
                    key={id}
                    className="flex items-center h-0 px-[15.5px] py-[9px] mb-4 last:mb-0 text-primary dark:text-white text-xs capitalize tracking-[0.4px]">
                    <i
                      className={`flex rounded-full w-2 h-2 mr-2 bg-${COLOR_CHANNELS_CHART[id]}`}></i>
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
          </Flex>
        </Flex>
        <Flex alignItems="end" className="flex-col sm:flex-row">
          <Flex className="pr-1">
            <Text className="font-light text-purple dark:text-white tracking-[0.4px]">
              More than
              <span className="font-bold mx-1">
                {numberWithCommas(sale_total)}
              </span>
              sales are made using referral marketing, and
              <span className="font-bold mx-1">
                {numberWithCommas(sale_social_media)}
              </span>
              are from social media.
            </Text>
          </Flex>
          <Flex
            justifyContent="end"
            className="hidden w-full md:w-2/3 mt-6 md:mt-4">
            <Button
              variant={VARIANT_BUTTON.PRIMARY}
              additionalClass="min-w-[64px] sm:max-w-[117px] text-center uppercase sm:px-[22px] px-6 py-2.5 rounded-lg border-0 shadow-btn-primary hover:shadow-btn-primary-hover dark:hover:shadow-btn-primary-hover">
              <Text className="flex items-center uppercase py-[2px] text-xs font-bold text-white dark:text-dark-tremor-content-title tracking-wide">
                Read more
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ChannelChart;
