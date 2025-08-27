export interface Credentials {
  email: string;
  password: string;
}

export interface ProfileForm {
  name?: string;
  email: string;
  password?: string;
  avatar?: File;
}
