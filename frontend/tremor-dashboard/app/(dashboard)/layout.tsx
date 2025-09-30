// Libs
import { ReactNode } from "react";

// Layouts
import { DashboardLayout } from "@/components/layouts";

// Services
import { getUserById } from "@/services";

// Helpers
import { getUserFromCookies } from "@/helpers/user";

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const userCookie = await getUserFromCookies();
  const user = await getUserById(userCookie.id);
  const { id, role, pinCode } = user || {};

  const profileData = {
    ...user,
    pinCode,
    role,
    id,
  };

  return (
    <DashboardLayout profileData={profileData}>{children}</DashboardLayout>
  );
}
