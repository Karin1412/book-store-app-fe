import { z } from "zod";
export const profileFormConfig = {
  schema: z.object({
    imageUrl: z.string(),
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name must be at least 1 character long"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    phone: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits long")
      .regex(/^\d+$/, "Phone number must contain only digits"),
  }),
  defaultValues: {
    name: "",
    email: "",
    phone: "",
  },
};
