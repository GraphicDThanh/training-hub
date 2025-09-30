import { memo } from "react";
import isEqual from "react-fast-compare";

// Components
import Link from "next/link";
import { Text, Flex, Card } from "@tremor/react";
import { Avatars, Button, CustomImage } from "@/components";

// Constants
import { VARIANT_BUTTON, ROUTES, PLACEHOLDER_IMAGE } from "@/constants";
import { Project } from "@/types";
import { InView } from "react-intersection-observer";

interface ProjectInfoCardProps {
  projects: Project[];
}

const ProjectInfoCard = ({ projects }: ProjectInfoCardProps) => {
  const renderProjectCards = projects.map(
    ({ id, toolsData, description, participantsData, name }, index) => {
      const srcImageCard = toolsData?.[0]?.image ?? PLACEHOLDER_IMAGE;

      return (
        <Flex
          key={id}
          justifyContent="start"
          flexDirection="col"
          alignItems="start">
          <Card className="dark:bg-dark-tremor-primary mx-auto pb-4 py-1 pt-[5px] px-4 2xl:px-6 ring-0 max-w-full lg:max-w-[356px] 2xl:max-w-full border border-romance dark:border-grey relative mt-[40px] rounded-xl shadow">
            <InView>
              <Flex className="absolute top-[-22px] left-40px w-[74px] h-[74px] p-1 bg-gradient-arsenic justify-center rounded-xl dark:bg-gradient-pickled">
                <CustomImage
                  src={srcImageCard}
                  width={60}
                  height={60}
                  alt={`${name}-cover`}
                  priority
                  className="rounded-md"
                />
              </Flex>
            </InView>
            <Flex
              justifyContent="start"
              flexDirection="col"
              alignItems="start"
              className="pb-3 pt-1">
              <Text className="capitalize font-normal dark:text-dark-tremor-content-romance pl-[5.5rem]">
                Project #{index + 1}
              </Text>
              <h4 className="w-full font-semibold text-md capitalize text-primary dark:text-dark-primary pl-[5.5rem] leading-6 line-clamp-2 items-center">
                <Link href={ROUTES.PROJECTS}>{name}</Link>
              </h4>
              <InView>
                <div
                  className={`text-sm text-tertiary my-4 font-light dark:text-dark-tremor-content-romance h-[2.8rem] line-clamp-2 [&>*>*]:!text-primary [&>*>*]:dark:!text-white`}
                  dangerouslySetInnerHTML={{ __html: description! }}
                />
              </InView>
              <Flex>
                <Link href={ROUTES.PROJECTS}>
                  <Button
                    additionalClass="font-sans bg-inherit hover:bg-transparent hover:opacity-75 py-[7px] px-4"
                    variant={VARIANT_BUTTON.SECONDARY_SHADOW}
                    variantTremor={VARIANT_BUTTON.SECONDARY}>
                    <Text className="font-bold text-seldom text-xs leading-[17px] dark:text-dark-tremor-content-seldom">
                      View Project
                    </Text>
                  </Button>
                </Link>
                {participantsData && (
                  <InView>
                    <Flex
                      justifyContent="end"
                      alignItems="start"
                      className={`mt-1 pl-1 h-[1.5rem] truncate`}>
                      <Avatars
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] min-w-[24px]"
                        totalParticipantsShow={5}
                        participantsData={participantsData}
                      />
                    </Flex>
                  </InView>
                )}
              </Flex>
            </Flex>
          </Card>
        </Flex>
      );
    },
  );

  return (
    <Flex
      justifyContent="start"
      alignItems="start"
      className="flex-wrap grid gap-x-6 gap-y-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {renderProjectCards}
    </Flex>
  );
};

export default memo(ProjectInfoCard, isEqual);
