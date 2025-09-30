import EditUserForm from "@/features/users/Forms/EditUserForm";

// Components
import { NoPermissionContent } from "@/components";

// Helpers
import { getUserFromCookies } from "@/helpers";

// Service
import { getUserById } from "@/services";

// Type
import { USER_ROLE } from "@/types";

const EditUser = async ({ params }: { params: { id: number } }) => {
  const userData = await getUserById(params.id);
  const userCookie = await getUserFromCookies();

  if (userCookie.role !== USER_ROLE.ADMIN) {
    return <NoPermissionContent />;
  }

  return (
    <main>
      <EditUserForm
        id={params.id}
        userData={userData}
        requestedId={userCookie.id}
      />
    </main>
  );
};

export default EditUser;
