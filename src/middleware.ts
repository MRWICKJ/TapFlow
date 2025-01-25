import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public route matcher
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/features",
  "/pricing",
  "/about",
  "/contact",
]);

// Public API route matcher
const isPublicApi = createRouteMatcher([
  "/api/public/user/count",
  "/api/public/transaction/count",
  "/api/public/transaction/amount",

]);

export default clerkMiddleware(async (auth, req) => {
  // Fetch the authenticated user ID using auth() from Clerk
  const { userId } = await auth();
  const currentUrl = new URL(req.url);

  const isApiRequest = currentUrl.pathname.startsWith("/api");
  const isPublicApiRequest = isApiRequest && isPublicApi(req);
  const isAuthPage = currentUrl.pathname.startsWith("/sign-in") || currentUrl.pathname.startsWith("/sign-up");

  if (userId && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicApiRequest) {
    return NextResponse.next();
  }

  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
