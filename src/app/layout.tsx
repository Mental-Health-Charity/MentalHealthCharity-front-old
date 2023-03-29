"use client";
import GlobalStyle from "@/common/styles/Global.style"
import Navbar from "./layout/navbar/Navbar.component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <GlobalStyle />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
