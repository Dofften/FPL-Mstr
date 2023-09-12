import { Metadata } from "next";
import { SidebarNav } from "@/components/ui/ui/sidebar-nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "FPL Dashboard",
};

export default function SettingsLayout(props: {
  children: React.ReactNode;
  params: { slug: number };
}) {
  const sidebarNavItems = [
    {
      title: "You",
      href: `/dashboard/${props.params.slug}`,
    },
    {
      title: "You vs AI",
      href: `/dashboard/${props.params.slug}/youvsai`,
    },
    {
      title: "You vs Top 250",
      href: `/dashboard/${props.params.slug}/top250`,
    },
    {
      title: "All Players",
      href: `/dashboard/${props.params.slug}/statistics`,
    },
    // {
    //   title: "Display",
    //   href: "/examples/forms/display",
    // },
  ];
  return (
    <>
      <Header />
      <div>
        <div className="flex flex-col lg:flex-row">
          <aside className="">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{props.children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
