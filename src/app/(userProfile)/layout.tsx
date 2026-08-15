import type { Metadata } from "next";

import UserNav from "@/components/userDashboard/UserNav";
import UserFooter from "@/components/userDashboard/UserFooter";
import { getLogoAndFooter } from "@/services/logo.api";

export const metadata: Metadata = {
  title: "Oqtos",
  description: "Oqtos is a new modern clothing brand",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: logoList } = await getLogoAndFooter();

  return (
    <div className="flex min-h-screen flex-col">
      <UserNav logoList={logoList} />

      <main className="flex-1">{children}</main>

      <UserFooter />
    </div>
  );
}