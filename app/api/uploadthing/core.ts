import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authenticateUser = async () => {
  const user = await auth();
  // If you throw, the user will not be able to upload
  if (!user) {
    throw new Error("Unauthorized");
  } else {
    return user;
  }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  challengeOptionImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  challengeOptionAudio: f({ audio: { maxFileSize: "32MB", maxFileCount: 1}})
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
