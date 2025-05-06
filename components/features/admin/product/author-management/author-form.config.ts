import { z } from "zod";
export const authorFormConfig = {
  schema: z.object({
    name: z.string().min(1, "Name is required"),
  }),
  defaultValues: {
    name: "",
  },
};
