import { SimpleSupplier } from "./supplier";
import { User } from "./user";

export enum ImportNoteStatus {
  InProgress = "In progress",
  Done = "Done",
  Cancel = "Cancel",
}

export type ImportNote = {
  id: string;
  supplier: SimpleSupplier;
  totalPrice: number;
  status: ImportNoteStatus;
  createdBy: User;
  closedBy: User;
  createdAt: Date;
  closedAt: Date;
};
