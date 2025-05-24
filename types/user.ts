export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  salt: string;
  role: Role;
  imgUrl: string;
  isActive: boolean;
};

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
