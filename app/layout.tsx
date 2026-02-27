import "./tailwind.css";

export const metadata = {
  title: "My App",
  description: "A personal finance workflow app",
}

import type { ReactNode } from "react";

export default function RootLayout({ children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
