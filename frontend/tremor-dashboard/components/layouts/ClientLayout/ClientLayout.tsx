"use client";

// Libs
import dynamic from "next/dynamic";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Components
import { Flex } from "@tremor/react";
import { LoadingIndicator, SideBar, DashboardHeader } from "@/components";
import { ProjectWrapper } from "@/features/projects";

// Types
import { User } from "@/types";

// Constants
import { ROUTES, PIN_CODE_SKIP_SET_KEY } from "@/constants";

// Services
import { authenticationLogout } from "@/services";

// Helpers
import { handleSingleKey } from "@/helpers";

// Context
import { PinCodeProvider } from "@/context/pincode";
import { Session, SessionProvider } from "@/context/session";
const ConversationProvider = dynamic(() => import("@/context/conversation"));

interface ClientLayoutProps {
  profileData: User;
  children: ReactNode;
}

const ClientLayout = ({ profileData, children }: ClientLayoutProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isCollapseSidebar, setIsCollapseSidebar] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const collapseScrollStyles = isCollapseSidebar
    ? "ml-0 xl:ml-28"
    : "xl:ml-[270px] xl:max-w-[calc(100%-270px)]";

  const toggleSidebar = () => {
    setIsCollapseSidebar(isCollapseSidebar => !isCollapseSidebar);
  };

  const { avatar, name, pinCode, id: userId, role } = profileData;

  const signOutAction = useCallback(async () => {
    setIsPending(true);
    await authenticationLogout();
    setIsCollapseSidebar(false);
    router.replace(ROUTES.SIGN_IN);
  }, [router]);

  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeysPressed((prevState: Record<string, boolean>) => ({
        ...prevState,
        [key]: true,
      }));

      if (keysPressed["a"]) {
        if (key === "n") router.replace(ROUTES.HOME);
        if (key === "p") router.replace(ROUTES.PROJECTS);
      } else {
        handleSingleKey(key, router);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeysPressed((prevState: Record<string, boolean>) => ({
        ...prevState,
        [key]: false,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed, router]);

  useEffect(() => {
    !userId && signOutAction();
  }, [signOutAction, userId]);

  useEffect(() => {
    if (pinCode && !localStorage.getItem(PIN_CODE_SKIP_SET_KEY)) {
      localStorage.setItem(PIN_CODE_SKIP_SET_KEY, "true");
    }
  }, [pinCode]);

  const session: Session = useMemo(
    () => ({ user: profileData }),
    [profileData],
  );

  return (
    <div className="relative">
      <SessionProvider session={session}>
        <ConversationProvider>
          <PinCodeProvider pinCode={pinCode}>
            <Flex
              alignItems="start"
              className="bg-select dark:bg-dark-primary antialiased font-primary min-h-screen pb-16">
              <SideBar
                avatarUrl={avatar}
                name={name}
                pathname={pathname}
                isCollapse={isCollapseSidebar}
                role={role}
                toggleSidebar={toggleSidebar}
                onSignOut={signOutAction}
              />
              <div
                className={`print-layout flex flex-col w-full min-h-screen p-4 sm:p-5 md:p-6 pt-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.6,1)] delay-20 ${collapseScrollStyles}`}>
                <DashboardHeader
                  role={role}
                  toggleSidebar={toggleSidebar}
                  isCollapseSidebar={isCollapseSidebar}
                />
                {pathname === ROUTES.PROJECTS ? (
                  <ProjectWrapper>{children}</ProjectWrapper>
                ) : (
                  children
                )}
              </div>
              {/* CHAT BOX */}
            </Flex>
            {isPending && (
              <LoadingIndicator width={10} height={10} isFullWidth={true} />
            )}
          </PinCodeProvider>
        </ConversationProvider>
      </SessionProvider>
    </div>
  );
};

export default ClientLayout;
