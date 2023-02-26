export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserDetailsStructure extends UserCredentials {
  email: string;
  about: string;
  avatar: string;
}
