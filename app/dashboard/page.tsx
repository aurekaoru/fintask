"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/login")
        return
      }

      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return null

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="mb-6">Welcome, {user?.email}</p>

      <div className="text-red-500 text-3xl">Tailwind works</div>

      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.replace("/login")
        }}
        className="px-1 py-2 bg-gray-800 text-black rounded-md hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  )
}
