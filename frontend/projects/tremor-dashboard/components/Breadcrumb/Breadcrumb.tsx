// Libs
import { memo } from "react";
import Link from "next/link";

// Components
import { Title } from "@tremor/react";
import { MdHome } from "react-icons/md";

// Constants
import { ROUTES } from "@/constants";

// Hooks
import UseBreadcrumb, { ItemBreadcrumbProps } from "@/hooks/useBreadcrumb";

// Helpers
import { cn } from "@/helpers";

export interface BreadcrumbProps {
  isScrolled: boolean;
  isUserAdmin?: boolean;
  pathname: string;
}

const Breadcrumb = ({
  isScrolled,
  pathname,
  isUserAdmin = false,
}: BreadcrumbProps): JSX.Element => {
  // UseBreadcrumb handle path return list item breadcrumb for render
  const {
    isProjectPage, // Check path is project page
    isStickyHeader, // Check path is project page and have scroll
    isDisplayTitle, // Check have display title
    itemsBreadcrumb, // List item for render breadcrumb
    getTitle, // Get tile from path
  } = UseBreadcrumb({ isScrolled, pathname, isUserAdmin });

  const renderCrumb = () => {
    return (
      <>
        {itemsBreadcrumb?.map(
          ({
            href,
            crumbItemTextWhite,
            activeCrumb,
            crumbName,
            linkActiveCrumb,
            pathLength,
            linkIndex,
          }: ItemBreadcrumbProps) => {
            return (
              <li
                key={href}
                className={cn(
                  "flex gap-1 sm:gap-2 bc-link text-sm capitalize tracking-[0.02857em]",
                  crumbItemTextWhite,
                  activeCrumb,
                )}>
                {linkActiveCrumb ? (
                  <Link href={href}>{crumbName}</Link>
                ) : (
                  <span
                    className={`${
                      isProjectPage && isStickyHeader
                        ? "text-white"
                        : "text-primary dark:text-dark-primary"
                    }`}>
                    {crumbName}
                  </span>
                )}
                {pathLength !== linkIndex && (
                  <span className={`${isProjectPage ? "text-white" : ""}`}>
                    &#47;
                  </span>
                )}
              </li>
            );
          },
        )}
      </>
    );
  };

  return (
    <nav className={`pl-3 ${isProjectPage ? "z-20" : "md:pl-0"}`}>
      <ol
        className={`flex flex-wrap gap-1 sm:gap-2 items-center ${
          isProjectPage && isStickyHeader
            ? "text-white dark:text-dark-primary"
            : "text-tremor-content dark:text-white"
        }`}>
        <li className="text-sm flex items-center gap-1 sm:gap-2 capitalize dark:text-dark-primary tracking-[0.02857em]">
          <Link href={ROUTES.HOME} aria-label="Home icon">
            <MdHome className="text-lg" />
          </Link>
          &#47;
        </li>
        {renderCrumb()}
      </ol>
      {isDisplayTitle && (
        <Title
          className={`text-tremor-content-title dark:text-dark-tremor-content-title font-bold capitalize tracking-[0.0075em] ${
            isStickyHeader && isUserAdmin ? "text-white" : "text-primary"
          }`}>
          {getTitle(pathname)}
        </Title>
      )}
    </nav>
  );
};

export default memo(Breadcrumb);
