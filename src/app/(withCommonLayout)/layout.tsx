import Categorybar from "@/components/layout/header/Categorybar";
import Navbar from "@/components/layout/header/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">
    <Navbar/>
    <Categorybar/>
    {children}
    </div>;
}
