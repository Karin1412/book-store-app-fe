import { z } from "zod";
export const bookPositionFormConfig = {
  schema: z.object({
    bookTitleId: z.string().min(1, "Book title is required"),
    zone: z.string().min(1, "Zone is required"),
    shelf: z.string().min(1, "Shelf is required"),
    row: z.string().min(1, "Row is required"),
    note: z.string(),
  }),
  defaultValues: {
    bookId: "",
    zone: "",
    shelf: "",
    row: "",
    note: "",
  },
};
