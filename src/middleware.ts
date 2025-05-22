import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/auth(.*)",
  "/",
  /^\/books\/[^\/]+$/, // Coincide con /books/cualquier-cosa (pero NO /books/123/edit)
  /^\/users\/[^\/]+$/, // Coincide con /users/cualquier-cosa (pero NO /users/123/edit)
  "/users",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow access to public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
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
