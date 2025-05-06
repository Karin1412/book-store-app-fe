import { Role, User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: Role.ADMIN,
    createdAt: "2024-10-01T09:00:00Z",
    updatedAt: "2025-03-15T14:30:00Z",
  },
  {
    id: "user-002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: Role.USER,
    createdAt: "2024-11-12T11:20:00Z",
    updatedAt: "2025-04-10T10:45:00Z",
  },
  {
    id: "user-003",
    name: "Clara Green",
    email: "clara.green@example.com",
    role: Role.USER,
    createdAt: "2025-01-05T08:30:00Z",
    updatedAt: "2025-05-01T09:15:00Z",
  },
  {
    id: "user-004",
    name: "David Lee",
    email: "david.lee@example.com",
    role: Role.ADMIN,
    createdAt: "2024-12-22T14:10:00Z",
    updatedAt: "2025-04-25T13:00:00Z",
  },
];
