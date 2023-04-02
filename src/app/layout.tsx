"use client";
import styles from "../common/styles/_global.module.scss"
import Navbar from "./layout/navbar/Navbar.component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head />
      <body className={styles.body}>
          <Navbar />
          {children} 
      </body>
    </html>
  )
}
