import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const productSchema = z.object({
  image: z
    .union([z.instanceof(File), z.string()])
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (file) =>
        !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png formats are supported."
    ),
  name: z.string().min(1, "Product name harus diisi!"),
  stock: z.coerce.number().min(1, "Product stock harus diisi!"),
  price: z.coerce.number().min(1, "Product price harus diisi!"),
});

export type ProductValues = z.infer<typeof productSchema>;
