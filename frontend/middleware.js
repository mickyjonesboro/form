import { NextResponse } from "next/server";

// Middleware function
export async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip asset requests
  if (
    pathname.startsWith("/_next") || // Internal Next.js assets
    pathname.endsWith(".js") || // JavaScript files
    pathname.endsWith(".css") || // CSS files
    pathname.endsWith(".png") || // Images
    pathname.endsWith(".jpg") || // More images
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg")
  ) {
    return NextResponse.next();
  }

  // Skip /home and /expired routes
  if (pathname === "/home" || pathname === "/expired") {
    return NextResponse.next();
  }

  // Extract dynamic part (ID)
  const id = pathname.split("/")[1];

  // Perform check with backend
  try {
    const response = await fetch("https://form-d45b.onrender/check-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: id }),
    });

    const data = await response.json();
    if (data.isValid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/expired", request.url));
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/expired", request.url));
  }
}

// Catch all routes after "/"
export const config = {
  matcher: "/:path*", // Catch any route after "/"
};
