import { NextResponse } from "next/server";

export async function middleware(request) {
  const jwt = "token=" + request.cookies.get("token")?.value;
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/verify", {
      method: "POST",
      headers: {
        cookie: jwt,
      },
    });

    if (response.ok) {
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
  matcher: ["/resetPassword", "/rivals/(.*)"],
};
