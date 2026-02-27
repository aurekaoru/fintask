import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export default async function proxy(request: Request) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.headers
            .get("cookie")
            ?.match(new RegExp(`${name}=([^;]+)`))?.[1];
        },
        set(name, value, options) {
          response.cookies.set(name, value, options);
        },
        remove(name) {
          response.cookies.delete(name);
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = new URL(request.url);

  if (!session && url.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
