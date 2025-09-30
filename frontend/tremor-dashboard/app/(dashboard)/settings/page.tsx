// Utils
import { getUserFromCookies } from "@/helpers";

// Services
import { getUserById } from "@/services";

// Components
import { SettingsWrapper } from "@/features/settings";

const Settings = async () => {
  const userCookie = await getUserFromCookies();
  const user = await getUserById(userCookie.id);

  return <SettingsWrapper user={user} />;
};

export default Settings;
