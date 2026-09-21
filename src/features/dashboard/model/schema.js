import z from "zod";

export const profileSchema = z.object({
  profilePicture: z.preprocess(
    (value) =>
      value instanceof FileList ? (value.item(0) ?? undefined) : value,
    z.instanceof(File).optional(),
  ),
  firstName: z.string().trim().min(1, { message: "Can't be empty" }),
  lastName: z.string().trim().min(1, { message: "Can't be empty" }),
});

export const linksSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(1, "Can't be empty"),
      url: z.string().min(1, "Can't be empty").url("Please check the URL"),
    }),
  ),
});
