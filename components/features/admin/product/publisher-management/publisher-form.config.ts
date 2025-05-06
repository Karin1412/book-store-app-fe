import { z } from "zod";
export const publisherFormConfig = {
  schema: z.object({
    name: z.string().min(1, "Name is required"),
  }),
  defaultValues: {
    name: "",
  },
};
