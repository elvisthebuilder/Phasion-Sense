"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { CheckoutModal } from "@/components/commerce/checkout-modal";
import { SiteHeader } from "@/components/layout/site-header";
import { ToastStack } from "@/components/layout/toast-stack";

type AppShellProps = {
    children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(17,24,39,0.06),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-900">
            <SiteHeader />
            <main className="pt-24">{children}</main>
            <ToastStack />
            <CartDrawer />
            <CheckoutModal />
        </div>
    );
}
