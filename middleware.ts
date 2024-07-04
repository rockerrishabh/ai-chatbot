import { auth } from "@/auth";

export default auth((req) => {});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
