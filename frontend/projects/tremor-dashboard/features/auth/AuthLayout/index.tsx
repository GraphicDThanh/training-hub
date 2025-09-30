"use client";

import { ReactNode, useContext } from "react";

// Components
import { Button, Flex } from "@tremor/react";

// Context
import { ThemeContext } from "@/context/theme";

// Constants
import { VARIANT_BUTTON } from "@/constants";

// Icons
import { HiMiniMoon } from "react-icons/hi2";
import { IoSunny } from "react-icons/io5";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <Flex
      className="relative px-6 bg-auth-image min-h-screen bg-cover bg-center md:min-w-[320px]"
      as="main">
      <div className="absolute top-5 right-5">
        <Button
          aria-label="Toggle Theme Button"
          variant={VARIANT_BUTTON.LIGHT}
          className="relative p-2 flex items-center"
          onClick={toggleTheme}>
          {isDarkTheme ? (
            <IoSunny className="text-white text-xl cursor-pointer" />
          ) : (
            <HiMiniMoon className={`text-white text-xl cursor-pointer`} />
          )}
        </Button>
      </div>
      {children}
    </Flex>
  );
};

export default AuthLayout;
