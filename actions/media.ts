"use server";

import db from "@/db/drizzle";
import { media } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addMedia = async (image:string) => {
  const user = await currentUser();
  if (!user || !user.id) {
    redirect("/sign-in");
  }
  const userId = user.id;

  const data = await db.insert(media).values({
    userId,
    image,
  });

  revalidatePath("/admin/media");
  return data;
};

export const getAllMedia = async () => {
  return await db.query.media.findMany();
};
