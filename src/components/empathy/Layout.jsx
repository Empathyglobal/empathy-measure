import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "@/components/empathy/Menu";
import SiteFooter from "@/components/empathy/SiteFooter";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Menu />
      <div role="note" className="mx-auto max-w-3xl px-5 pt-5 text-sm text-muted-foreground print:block">
        Community research preview. Scores are experimental and are not validated for diagnosis or consequential decisions.
      </div>
      <Outlet />
      <SiteFooter />
    </div>
  );
}