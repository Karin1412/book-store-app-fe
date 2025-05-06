import { z } from "zod";
export const bookTitleFormConfig = {
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    categoryId: z.string().min(1, "Category is required"),
    authorId: z.string().min(1, "Author is required"),
    description: z.string(),
  }),
  defaultValues: {
    title: "",
    categoryId: "",
    authorId: "",
    description: "",
  },
};
