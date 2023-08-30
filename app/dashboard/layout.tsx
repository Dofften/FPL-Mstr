import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/ui/separator";
import { SidebarNav } from "@/components/ui/ui/sidebar-nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "FPL Dashboard",
};

const sidebarNavItems = [
  {
    title: "You",
    href: "/dashboard",
  },
  {
    title: "You vs AI",
    href: "/dashboard/youvsai",
  },
  {
    title: "You vs Top 15",
    href: "/dashboard/top15",
  },
  {
    title: "All Players",
    href: "/dashboard/statistics",
  },
  // {
  //   title: "Display",
  //   href: "/examples/forms/display",
  // },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row">
          <aside className="">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
