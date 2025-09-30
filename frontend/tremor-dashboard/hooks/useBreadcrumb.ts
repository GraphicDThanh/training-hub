"use client";

import { useParams } from "next/navigation";

import { ROUTES } from "@/constants";
import { BreadcrumbProps } from "@/components/Breadcrumb/Breadcrumb";

import { getCrumbName, handleMatchPath } from "@/helpers";

export interface ItemBreadcrumbProps {
  href: string;
  crumbItemTextWhite: string;
  activeCrumb: string;
  crumbName: string;
  linkActiveCrumb: boolean;
  pathLength: number;
  linkIndex: number;
}

const UseBreadcrumb = ({
  isScrolled,
  pathname,
  isUserAdmin,
}: BreadcrumbProps) => {
  const params = useParams() ?? {};

  const isProjectPage = pathname.includes(ROUTES.PROJECTS);
  const isStickyHeader = !isScrolled && isProjectPage;

  const newPath = pathname?.split("/").filter(path => path);
  const pathLength = newPath.length;

  const isDisplayTitle = 1 < pathLength && pathLength < 3;

  const getTitle = (path?: string) => {
    if (path) return handleMatchPath(path);

    return newPath?.pop()?.replace("-", " ");
  };

  const itemsBreadcrumb: ItemBreadcrumbProps[] = [];

  newPath?.map((link, index) => {
    const linkIndex = index + 1;

    // Split link by "/" to know its parent page
    const href = `/${newPath.slice(0, linkIndex).join("/")}`;

    const crumbItemTextWhite =
      isProjectPage && isStickyHeader && isUserAdmin
        ? "text-white dark:text-white"
        : "text-primary";
    const activeCrumb =
      pathname === href
        ? "text-primary dark:text-dark-tremor-content-title"
        : "text-primary dark:text-dark-primary";

    const idParam = params.id;

    const crumbName = getCrumbName({
      name: isProjectPage ? "Projects" : link,
      params: params?.id,
    });

    const editProductDetail = `${ROUTES.PRODUCTS}/${idParam}`;

    const linkActiveCrumb =
      !!idParam &&
      (Object.values(ROUTES).includes(href) ||
        (pathLength === 3 && href === editProductDetail)) &&
      href !== ROUTES.INVOICES;
    // href !== ROUTES.INVOICES not cover so except it

    itemsBreadcrumb.push({
      href: href,
      crumbItemTextWhite: crumbItemTextWhite,
      activeCrumb: activeCrumb,
      crumbName: crumbName,
      linkActiveCrumb: linkActiveCrumb,
      pathLength: newPath.length,
      linkIndex: linkIndex,
    });
  });

  return {
    isProjectPage,
    isStickyHeader,
    isDisplayTitle,
    pathLength,
    itemsBreadcrumb,
    getTitle,
  };
};

export default UseBreadcrumb;
