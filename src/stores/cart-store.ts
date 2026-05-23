import { create } from "zustand";
import type { ItemResponse } from "@/lib/commerce";

export type CartLine = {
    item: ItemResponse;
    quantity: number;
    selectedSize: string;
};

type CartState = {
    lines: CartLine[];
    drawerOpen: boolean;
    checkoutOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    openCheckout: () => void;
    closeCheckout: () => void;
    addItem: (item: ItemResponse, quantity?: number, selectedSize?: string) => void;
    updateQuantity: (itemId: string, quantity: number, selectedSize?: string) => void;
    removeItem: (itemId: string, selectedSize?: string) => void;
    clearCart: () => void;
    getSubtotalMinor: () => number;
    getItemCount: () => number;
};

function lineKey(itemId: string, selectedSize: string) {
    return `${itemId}::${selectedSize}`;
}

export const useCartStore = create<CartState>((set, get) => ({
    lines: [],
    drawerOpen: false,
    checkoutOpen: false,
    openDrawer: () => set({ drawerOpen: true }),
    closeDrawer: () => set({ drawerOpen: false }),
    toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
    openCheckout: () => set({ checkoutOpen: true }),
    closeCheckout: () => set({ checkoutOpen: false }),
    addItem: (item, quantity = 1, selectedSize = "One size") =>
        set((state) => {
            const key = lineKey(item.id, selectedSize);
            const existingLine = state.lines.find((line) => lineKey(line.item.id, line.selectedSize) === key);

            if (existingLine) {
                return {
                    lines: state.lines.map((line) =>
                        lineKey(line.item.id, line.selectedSize) === key
                            ? { ...line, quantity: line.quantity + quantity }
                            : line,
                    ),
                    drawerOpen: true,
                };
            }

            return {
                lines: [...state.lines, { item, quantity, selectedSize }],
                drawerOpen: true,
            };
        }),
    updateQuantity: (itemId, quantity, selectedSize = "One size") =>
        set((state) => ({
            lines: state.lines
                .map((line) =>
                    lineKey(line.item.id, line.selectedSize) === lineKey(itemId, selectedSize)
                        ? { ...line, quantity }
                        : line,
                )
                .filter((line) => line.quantity > 0),
        })),
    removeItem: (itemId, selectedSize = "One size") =>
        set((state) => ({
            lines: state.lines.filter((line) => lineKey(line.item.id, line.selectedSize) !== lineKey(itemId, selectedSize)),
        })),
    clearCart: () => set({ lines: [], checkoutOpen: false, drawerOpen: false }),
    getSubtotalMinor: () => get().lines.reduce((total, line) => total + line.item.price_minor * line.quantity, 0),
    getItemCount: () => get().lines.reduce((total, line) => total + line.quantity, 0),
}));
