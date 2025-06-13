import { z } from "zod";
export const customerFormConfig = {
  schema: z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
  }),
  defaultValues: {
    id: "",
    name: "",
    email: "",
    phone: "",
  },
};
