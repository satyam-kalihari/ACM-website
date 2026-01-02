import {
  clerkMiddleware,
  createRouteMatcher,
  createClerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createUser } from "./lib/db/createUser";

const isPublicRoute = createRouteMatcher(["/sign-up(.*)", "/sign-in(.*)"]);
const isAdminProtectedRoute = createRouteMatcher(["/admin/dashboard(.*)", "/api/room(.*)"]);
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});



export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated, sessionClaims } = await auth();




  if (!isAuthenticated && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthenticated) {
    try {
      const userId = sessionClaims?.sub;
      if (userId) {


        const user = await clerkClient.users.getUser(userId);
        const role = user.publicMetadata.role as "admin" | "user" | "member" | undefined;

        if (req.nextUrl.pathname === "/api/user/create-user" && req.method === "GET") {

          try {
            const dbUser = await createUser({
              fullname: user.firstName + " " + user.lastName,
              email: user.emailAddresses[0].emailAddress,
              clerkId: user.id,
              avatar: user.imageUrl,
              role: role ? role : "user",
              techStack: []
            });

            if (dbUser) {
              return NextResponse.redirect(new URL("/dashboard", req.url));
            }
          } catch (e) {
            try {
              const res: any = await fetch('https://api.clerk.com/v1/users/{user_id}', {
                method: 'DELETE',
                headers: {
                  Authorization: req.headers.get('Authorization') || ''
                }
              })

              console.log("Failed to create DB user, deleted Clerk user. Clerk response:", res);
            } catch (err) {
              console.log("Failed to delete Clerk user after DB user creation failure:", (err as Error).message);
            }
            console.log("DB fetch error:", (e as Error).message);
            return NextResponse.redirect(new URL("/", req.url));
          }

        }

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
            new URL(
              role === "admin" ? "/admin/dashboard" : "/dashboard",
              req.url
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
