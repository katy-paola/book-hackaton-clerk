import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/auth(.*)", "/", "/users/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Si es una ruta pública, permitir acceso
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  
  // Si es una ruta protegida, verificar autenticación
  const { userId } = await auth();
  
  if (!userId) {
    // Redirigir a la página de autenticación personalizada
    // en lugar de usar el login predeterminado de Clerk
    const authUrl = new URL("/auth", req.url);
    return NextResponse.redirect(authUrl);
  }
  
  // Si el usuario está autenticado, permitir acceso
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
