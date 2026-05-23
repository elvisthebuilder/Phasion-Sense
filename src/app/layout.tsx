import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { CheckoutModal } from "@/components/shop/checkout-modal";
import { PhasionAIPanel } from "@/components/chat/phasion-ai-panel";
import { AiTipPopup } from "@/components/ui/ai-tip-popup";
import "./globals.css";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
    style: ["normal", "italic"]
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-playfair",
    style: ["normal", "italic"]
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-dm-sans",
});

export const metadata: Metadata = {
    title: "Phasion Sense",
    description: "Editorial fashion, rooted in Accra.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} font-sans antialiased bg-[var(--color-cream)] text-[var(--color-espresso)]`}>
                <QueryProvider>
                    <main className="min-h-screen flex flex-col relative">
                        <Navbar />
                        {children}
                        <Footer />
                        <CartDrawer />
                        <CheckoutModal />
                        <PhasionAIPanel />
                        <AiTipPopup />
                    </main>
                </QueryProvider>
            </body>
        </html>
    );
}