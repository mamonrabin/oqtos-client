import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./font";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";
import NextTopLoader from "nextjs-toploader";
import { WishlistProvider } from "@/components/wish-list/WishlistContext";
import { getTheme } from "@/services/theme.api";

export const metadata: Metadata = {
  title: "Oqtos",
  description: "Oqtos is new morden clothing brand",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme = null;

  try {
    const response = await getTheme("Active");
    theme = response?.data;
  } catch (error) {
    console.error("Failed to load theme:", error);
  }

  const primary = theme?.primary || "#087096";
  const secondary = theme?.secondary || "#e6f4f8";

  return (
    <html
      lang="en"
      className={`${poppins.className} antialiased`}
      style={
        {
          "--primary": primary,
          "--secondary": secondary,
        } as React.CSSProperties
      }
    >
      <body>
        <Toaster richColors position="top-right" />

        <Providers>
          <NextTopLoader
            showSpinner={false}
            color={primary}
          />

          <WishlistProvider>
            {children}
          </WishlistProvider>
        </Providers>
      </body>
    </html>
  );
}