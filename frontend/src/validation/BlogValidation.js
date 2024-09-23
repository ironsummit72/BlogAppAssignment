import { z } from "zod";
const BlogSchema = z.object({
  title: z
    .string()
    .min(10, "Title is Too Short")
    .max(500, "Title cannot be more than 500 characters"),
  content: z
    .string()
    .min(10, "Content is too short ")
    .max(5000, "Content cannot be more than 5000 characters"),
});

export default BlogSchema;
