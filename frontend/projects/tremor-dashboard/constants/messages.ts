export const MESSAGES_ERROR = {
  NAME_MIN_LENGTH: "Minimum length should be 4.",
  NAME_INVALID: "This field is no space at start or end",
  NAME_REQUIRED: "Name is required.",
  PASSWORD_REQUIRED: "Password is required.",
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_INVALID: "Invalid email address.",
  SKU_INVALID: "Invalid SKU number.",
  PASSWORD_INVALID:
    "Password must have at least 8 characters, 1 special character and 1 number.",
  FIELD_REQUIRED: "This field is required.",
  MIN_LENGTH_4: "This field must have more than 4 characters.",
  URL_REQUIRED: "URL is required.",
  INVALID_URL: "URL is invalid.",
  INVALID_PHONE_NUMBER: "Phone number is invalid",
  INVALID_BIRTH_DATE: "Birth date is invalid.",
  REPEAT_PASSWORD_INVALID: "Password not matching",
  TERMS_REQUIRED: "Please agree with the terms and conditions to continue.",
  CONFIRM_EMAIL: "The email confirmation does not match.",
  PRODUCT: {
    WEIGHT_LIMIT: "Weight has limit is 2000 pound.",
    QUANTITY_LIMIT: "Quantity has limit is 10000.",
    PRICE_LIMIT: "Price has limit is $20,000.",
  },
  TRANSACTION: {
    AMOUNT_LIMIT: "Amount has limit is $20,000.",
    MIN_AMOUNT: "Amount must be positive number.",
  },
};

export const MESSAGES_WARNING = {
  PRODUCT: {
    WEIGHT_IS_ZERO: "Missing weight is not encourage.",
    QUANTITY_IS_ZERO:
      "This product will has label sold out if have quantity default is 0.",
    ACCEPT_IMAGE_UPLOAD:
      "(We accept .png, .jpg, .jpeg, and .webp files, up to 32MB in size.)",
  },
};

export const MESSAGE_SIGN_UP = {
  SUCCESS: "Sign up successfully.",
  FAILED: "Failed to sign up",
};

export const MESSAGE_SIGN_IN = {
  FAILED: "Failed to sign in",
  SUCCESS: "Sign in successfully.",
  CREDENTIALS: "Please make sure your email address and password are correct.",
};

export const MESSAGE_ADD_PRODUCT = {
  SUCCESS: "Add product successfully",
  FAILED: "Failed to add product",
};

export const MESSAGE_EDIT_PRODUCT = {
  SUCCESS: "Edit product successfully",
  FAILED: "Failed to edit product",
};

export const MESSAGE_USER = {
  MAIL_EXISTS: "Account with this email already exists!",
  ADD_FAILED: "Failed to create new account. Please try again!",
  EDIT_SUCCESS: "Edit user successfully",
  EDIT_FAILED: "Failed to edit user",
  GET_USER_FAILED: "Failed to get user",
};

export const MESSAGE_SIGN_OUT = {
  SUCCESS: "Sign out successfully.",
  FAILED: "Failed to Sign out",
};

export const MESSAGE_ADD_PROJECT = {
  SUCCESS: "Add project successfully",
  FAILED: "Failed to add project",
};

export const MESSAGE_EDIT_PROJECT = {
  SUCCESS: "Edit project successfully",
  FAILED: "Failed to edit project",
};

export const MESSAGE_DELETE_PROJECT = {
  SUCCESS: "Delete project successfully",
  FAILED: "Failed to delete project",
};

export const MESSAGE_ADD_USER = {
  SUCCESS: "Add new user successfully",
  FAILED: "Failed to add new user",
};

export const MESSAGES_TRANSACTION = {
  ADD_SUCCESS: "Create new transaction successfully",
  ADD_FAILED: "Failed to create new transaction. Please try again!",
};
