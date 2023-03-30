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
      <head />
      <body>
        <GlobalStyle />
        <Navbar />
        {children} 
      </body>
    </html>
  )
}
