import {
  clerkMiddleware,
  createRouteMatcher,
  createClerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-up(.*)", "/sign-in(.*)"]);
const isProtectedRoute = createRouteMatcher(["/admin/dashboard(.*)"]);
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, redirectToSignIn, sessionClaims } = await auth();

  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  if (isAuthenticated) {
    try {
      const userId = sessionClaims?.sub;
      if (userId) {
        const user = await clerkClient.users.getUser(userId);
        const role = user.publicMetadata.role as string | undefined;
  
        //admin role redirection
        if (role === "admin" && req.nextUrl.pathname == "/dashboard") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
  
        if (role !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL("/dashboard"));
        }
  
        // redirect auth user trying to access public routes
        if (isPublicRoute(req)) {
          return NextResponse.redirect(
            new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url)
          );
        }
      }
    } catch (error) {
      console.error(error)
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
