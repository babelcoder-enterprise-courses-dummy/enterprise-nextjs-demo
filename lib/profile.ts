import { z } from "zod";

export const getAvatarUrl = (avatar?: string) => {
  if (!avatar) return "/assets/images/avatar.png";
  return z.url().safeParse(avatar).success
    ? avatar
    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${avatar}`;
};
