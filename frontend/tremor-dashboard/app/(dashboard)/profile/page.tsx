import dynamic from "next/dynamic";
import Image from "next/image";

// Components
import { InView } from "react-intersection-observer";
import { Flex, Card, Text } from "@tremor/react";
import { ContactCard } from "@/features/profile";

const ProjectInfoCard = dynamic(
  () => import("@/features/projects/ProjectInfoCard/ProjectInfoCard"),
);
const ProfileInfo = dynamic(
  () => import("@/components/ProfileInfo/ProfileInfo"),
);
const ConversationHistory = dynamic(
  () => import("@/features/profile/ConversationHistory/ConversationHistory"),
);

// Actions
import { getUserById, getUserProjects } from "@/services";

// Helpers
import { getUserFromCookies } from "@/helpers/user";

// Constants
import { ROLES } from "@/constants/account";

export const metadata = {
  title: "Profile Overview - Tremor Dashboard",
};

const Profile = async () => {
  const userCookie = await getUserFromCookies();

  const [user, projectsData] = await Promise.all([
    getUserById(userCookie.id),
    getUserProjects(userCookie.id),
  ]);

  const {
    name,
    role,
    avatar,
    email,
    bio,
    phoneNumber,
    facebookUrl,
    instagramUrl,
    twitterUrl,
    location,
  } = user;

  return (
    <main>
      <div className="relative overflow-hidden md:min-w-[320px] min-h-[300px] rounded-xl">
        <Image
          alt="Background Profile"
          src={"/images/backgrounds/bg-profile.webp"}
          priority
          fill
          className="object-cover"
          sizes="(max-width: 768px) 33vw, 100vw"
        />
        <div className="absolute w-full h-full bg-gradient-secondary-light rounded-xl"></div>
      </div>
      <section className="mx-3 sm:mx-6 -mt-16">
        <Card className="p-4 sm:p-6 dark:bg-dark-tremor-primary ring-0">
          <Flex
            flexDirection="col"
            alignItems="start"
            className="md:flex-row md:items-center">
            {/* Header */}
            <ProfileInfo
              name={name}
              role={ROLES[role].label}
              avatarUrl={avatar}
            />
          </Flex>
          {/* Main content */}
          <Flex
            flexDirection="col"
            alignItems="start"
            className="my-6 sm:flex-row sm:flex-wrap md:flex-wrap md:gap-5 lg:flex-nowrap">
            <Flex
              flexDirection="col"
              alignItems="start"
              className="md:flex-row md:gap-4 lg:gap-10">
              {/* Profile Information */}
              <Flex className="w-full">
                <ContactCard
                  information={bio}
                  fullName={name}
                  phone={phoneNumber}
                  email={email}
                  location={location}
                  socials={{
                    facebook: facebookUrl,
                    instagram: instagramUrl,
                    twitter: twitterUrl,
                  }}
                />
              </Flex>
              <hr className="hidden rounded h-[320px] w-px bg-gradient-lighter dark:bg-gradient-dark my-4 border-0 opacity-25 lg:flex" />
            </Flex>
            {/* Profile Conversations */}
            <InView className="w-full mt-6 lg:mt-0">
              <ConversationHistory />
            </InView>
          </Flex>
          {/* Projects */}
          {projectsData.length > 0 && (
            <Flex flexDirection="col" alignItems="start">
              <h3 className="text-tremor-content-title dark:text-dark-tremor-content-title font-semibold text-tremor-title">
                Projects
              </h3>
              <Text className="font-light leading-normal  dark:text-dark-tremor-content-romance text-sm text-tertiary mb-6">
                Architects design houses
              </Text>
              {projectsData.length ? (
                <ProjectInfoCard projects={projectsData} />
              ) : (
                <Text className="font-light leading-normal  dark:text-dark-tremor-content-romance text-sm text-tertiary">
                  You haven&apos;t joined any projects yet.
                </Text>
              )}
            </Flex>
          )}
        </Card>
      </section>
    </main>
  );
};

export default Profile;
