import { ImportNote, ImportNoteStatus } from "@/types/import-note";
import { mockSimpleSuppliers } from "./supplier";
import { mockUsers } from "./user";

export const mockImportNotes: ImportNote[] = [
  {
    id: "imp-001",
    supplier: mockSimpleSuppliers[0],
    totalPrice: 1250.5,
    status: ImportNoteStatus.Done,
    createdBy: mockUsers[0],
    closedBy: mockUsers[1],
    createdAt: new Date("2025-04-01T10:00:00Z"),
    closedAt: new Date("2025-04-02T15:30:00Z"),
  },
  {
    id: "imp-002",
    supplier: mockSimpleSuppliers[1],
    totalPrice: 980.75,
    status: ImportNoteStatus.InProgress,
    createdBy: mockUsers[0],
    closedBy: mockUsers[1],
    createdAt: new Date("2025-05-01T09:15:00Z"),
    closedAt: new Date("1970-01-01T00:00:00Z"), // Placeholder for not yet closed
  },
  {
    id: "imp-003",
    supplier: mockSimpleSuppliers[2],
    totalPrice: 0,
    status: ImportNoteStatus.Cancel,
    createdBy: mockUsers[0],
    closedBy: mockUsers[1],
    createdAt: new Date("2025-03-20T13:45:00Z"),
    closedAt: new Date("2025-03-20T16:00:00Z"),
  },
];
