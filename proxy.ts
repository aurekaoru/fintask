import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export default async function proxy(req: Request) {
  const url = new URL(req.url)
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.headers.get("cookie")?.match(new RegExp(`${name}=([^;]+)`))?.[1]
        },
        set(name, value, options) {
          res.cookies.set(name, value, options)
        },
        remove(name, options) {
          res.cookies.delete(name, options)
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect /app routes
  if (!session && url.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}
