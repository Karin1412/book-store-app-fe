import { z } from "zod";
export const bookDetailFormConfig = {
  schema: z.object({
    imageUrl: z
      .string({ required_error: "Image URL is required" })
      .url("Invalid URL"),
    title: z.string().min(1, "Title is required"),
    authorId: z.string({ required_error: "Author is required" }),
    publisherId: z.string({ required_error: "Publisher is required" }),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  }),
  defaultValues: {
    imageUrl: "",
    title: "",
    authorId: "",
    publisherId: "",
    price: "",
  },
};
