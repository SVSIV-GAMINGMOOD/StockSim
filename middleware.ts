import { updateSession } from "@/lib/supabase/proxy";


export const middleware = updateSession;

export const config = {
  matcher: [
    // Protect everything except:
    // - _next assets
    // - static files
    // - images
    // - favicon
    // - auth routes (avoid redirect loop)
    // "/dashboard/:path*",
    '/dashboard/:path*', '/auth/:path*',
    "/((?!_next/static|_next/image|favicon.ico|images|public|auth|login).*)",
  ],
};
