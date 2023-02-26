export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserDetailsStructure extends UserCredentials {
  email: string;
  avatar: string;
}
