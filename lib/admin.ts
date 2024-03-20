import { auth } from "@clerk/nextjs";

const allowedIds = [process.env.ADMIN_USER_ID1, process.env.ADMIN_USER_ID2];
export const isAdmin = () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};
