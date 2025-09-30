import { Flex } from "@tremor/react";
import { LoadingIndicator } from "@/components";

const LoadingPage = ({
  width = 16,
  height = 16,
  fillColor = "river-bed-500",
  isShowTextLoading = true,
}: {
  width?: number;
  height?: number;
  fillColor?: string;
  isShowTextLoading?: boolean;
}) => (
  <Flex
    justifyContent="center"
    className="grow w-full"
    data-testid="loading-page">
    <Flex flexDirection="col" className="grow w-full h-full">
      <LoadingIndicator width={width} height={height} fillColor={fillColor} />
      {isShowTextLoading && <h2 className="mt-2 text-gray-400">Loading</h2>}
    </Flex>
  </Flex>
);

export default LoadingPage;
