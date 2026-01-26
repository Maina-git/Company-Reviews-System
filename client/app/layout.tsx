import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavWrapper from "@/components/home/Navbar/NavWrapper";
import "./globals.css";

const font = Poppins({
  weight:["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Company Review System",
  description: "Company review system using next js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}>
          <NavWrapper/>
        {children}
      </body>
    </html>
  );
}
