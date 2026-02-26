import "./tailwind.css";

export const metadata = {
  title: "My App",
  description: "A personal finance workflow app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
