import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./font";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Oqtos",
  description: "Oqtos is new morden clothing brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} antialiased`}>

      <body className="">
        <Toaster richColors position="top-right" />
        {children}
        </body>
    </html>
  );
}
