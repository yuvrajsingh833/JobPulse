export type loginData = {
  username: string;
  password: string;
};

export type signupData = {
  username: string;
  password: string;
  confirm_password: string;
};

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "tertiary"
  | "cancel"
  | "delete";
