import { memo, useMemo } from "react";

// Components
import { BarChart, Card, Flex, Subtitle, Text } from "@tremor/react";

// Icons
import { FaRegClock } from "react-icons/fa";

interface DataProps {
  description: string;
  sales: number;
}

export interface TWebChartData {
  id: string;
  display: string;
  desc: string;
  modified: string;
  data: DataProps[];
}

interface WebChartDataProps {
  webChartData: TWebChartData;
}

const ColumnChart = ({ webChartData }: WebChartDataProps) => {
  const { display, desc, modified, data } = webChartData;

  const MAPPING_DATA = useMemo(() => data, [data]);

  return (
    <div className="w-full bg-white dark:bg-dark-tremor-primary bg-clip-border shadow-[0rem_0.25rem_0.375rem_-0.0625rem_rgba(0,0,0,0.1),0rem_0.125rem_0.25rem_-0.0625rem_rgba(0,0,0,0.06)] overflow-visible h-full rounded-xl border-0 border-solid border-[rgba(0,0,0,0.125)]">
      <div className="p-4">
        <Flex className="">
          <main className="w-full mx-auto">
            <div className="-mt-10">
              <Card className="p-2 bg-[linear-gradient(195deg,#42424a,#191919)] dark:bg-gradient-pickled shadow-[0rem_0.25rem_1.25rem_0rem_rgba(0,0,0,0.14),0rem_0.4375rem_0.625rem_-0.3125rem_rgba(64,64,64,0.4)] ring-0">
                <BarChart
                  className="h-[168px] mt-4"
                  data={MAPPING_DATA}
                  index="description"
                  categories={["sales"]}
                  colors={["light-500"]}
                  yAxisWidth={30}
                  showAnimation={true}
                  showLegend={false}
                />
              </Card>
            </div>
          </main>
        </Flex>
        <div className="flex-col items-start pt-6 pb-2 px-2">
          <div>
            <h3 className="text-base dark:text-dark-primary font-bold opacity-100 capitalize text-primary">
              {display}
            </h3>
            <Subtitle className="text-sm text-tertiary dark:text-dark-romance font-light opacity-100 truncate max-w-[310px]">
              {desc}
            </Subtitle>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(52,71,103,0),rgba(52,71,103,0.4),rgba(52,71,103,0))] dark:bg-gradient-divider h-px opacity-25 mx-0 my-4" />
          <Flex justifyContent="start">
            <FaRegClock
              size={12}
              className="text-secondary dark:text-dark-romance"
            />
            <Text className="text-sm text-tertiary dark:text-dark-romance font-light opacity-100 ml-1">
              {modified}
            </Text>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default memo(ColumnChart);
