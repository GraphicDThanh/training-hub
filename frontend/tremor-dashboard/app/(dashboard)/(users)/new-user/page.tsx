// Components
import { AddUserForm } from "@/features/users/Forms";
import { NoPermissionContent } from "@/components";

// Helpers
import { getUserFromCookies } from "@/helpers";

// Type
import { USER_ROLE } from "@/types";

const AddUserPage = async () => {
  const userCookie = await getUserFromCookies();

  if (userCookie.role !== USER_ROLE.ADMIN) {
    return <NoPermissionContent />;
  }

  return (
    <div className="mt-10 mb-18 mx-auto lg:w-[67%]">
      {/* Heading */}
      <div className="mt-12 mb-16">
        <h3 className="text-xl lg:text-3xl font-bold text-primary dark:text-white text-center mb-2">
          Add New User
        </h3>
        <h4 className="text-md lg:text-xl dark:text-secondary text-grey text-center">
          This information will describe more about the user.
        </h4>
      </div>
      <AddUserForm userId={userCookie.id} />
    </div>
  );
};

export default AddUserPage;
