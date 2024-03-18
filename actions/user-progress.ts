"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { currentUser } from "@clerk/nextjs";
import { userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const userId = user.id;

  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  //   TODO: Enavle once units and lessons are added
  //   if (!course.units.length || !course.units[0].length) {
  //     throw new Error("Course is empty");
  //   }

  const existingUserProgress = await getUserProgress();
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });
    revalidatePath("/courses");
    revalidatePath("/learn");

    redirect("/learn");
  }
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");

  redirect("/learn");
};
