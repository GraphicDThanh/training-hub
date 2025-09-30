// Libs
import { Control, Controller } from "react-hook-form";

// Components
import { InputField } from "@/components";

// Constants
import { MESSAGES_ERROR, REGEX } from "@/constants";

// Types
import { SocialFormData } from "@/types";

interface SocialsProps {
  control: Control<SocialFormData>;
  id: string;
  name: string;
  label: string;
  value: string;
}

const SocialField = ({ control, id, name, label }: SocialsProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        pattern: {
          value: REGEX.URL,
          message: MESSAGES_ERROR.INVALID_URL,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="min-h-20 w-full">
          <InputField
            id={id}
            label={label}
            type="text"
            errorMessage={error?.message}
            {...field}
          />
        </div>
      )}
    />
  );
};

export default SocialField;
