export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
