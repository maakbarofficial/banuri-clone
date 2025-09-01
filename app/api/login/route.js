import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "admin") {
    const res = NextResponse.json({ message: "Logged in" });
    // Set HttpOnly cookie
    res.cookies.set({
      name: "auth",
      value: "true",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } else {
    return NextResponse.json(
      { message: "یوزر نیم یا پاس ورڈ غلط ہے" },
      { status: 401 }
    );
  }
}