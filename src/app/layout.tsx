import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@src/utils/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Procurement Automation App",
  description: "Assessement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
    </html>
  );
}
