import { z } from "zod";
export const bookDetailFormConfig = {
  schema: z.object({
    imageUrl: z
      .string({ required_error: "Image URL is required" })
      .url("Invalid URL"),
    bookTitleId: z.string().min(1, "Book title is required"),
    publisherId: z.string().min(1, "Publisher is required"),
    reprint: z
      .string({ required_error: "Please set the reprint number" })
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid reprint number"),
    listedPrice: z
      .string({ required_error: "Listed price is required" })
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
    unitPrice: z
      .string({ required_error: "Unit price is required" })
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  }),
  defaultValues: {
    imageUrl: "",
    bookTitleId: "",
    publisherId: "",
  },
};
