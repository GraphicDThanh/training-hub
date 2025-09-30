import Link from "next/link";

// Constants
import { ROUTES } from "@/constants";

// Icons
import { MdOutlineSentimentDissatisfied } from "react-icons/md";
import { Flex } from "@tremor/react";

const NotFound = () => {
  return (
    <Flex flexDirection="col" className="inset-0 justify-center mt-48">
      <MdOutlineSentimentDissatisfied
        size="64"
        className="w-10 text-gray-400"
      />
      <h2 className="text-sm lg:text-lg text-center text-tremor-content-title dark:text-dark-tremor-content-title my-2">
        404 | Not Found
      </h2>
      <Link
        href={ROUTES.HOME}
        className="text-white text-sm rounded-lg bg-gradient-pickled py-3 px-6 mt-8 border-none text-center">
        Back to Home
      </Link>
    </Flex>
  );
};

export default NotFound;
