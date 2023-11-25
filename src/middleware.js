import { NextResponse } from "next/server";

export async function middleware(request) {
  const jwt = "token=" + request.cookies.get("token")?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify`,
      {
        method: "POST",
        headers: {
          Cookie: jwt,
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// '/name/:paht*'  -> Para la ruta name y cualquier subruta de name

export const config = {
  matcher: ["/resetPassword", "/rivals/(.*)", "/myRivals", "/myRivals/(.*)"],
};
