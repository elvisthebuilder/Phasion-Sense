import { create } from "zustand";

export type ToastVariant = "default" | "success" | "error" | "info";

export type ToastItem = {
    id: string;
    title: string;
    description?: string;
    variant?: ToastVariant;
};

type ToastState = {
    toasts: ToastItem[];
    pushToast: (toast: Omit<ToastItem, "id">) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
};

function createToastId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    pushToast: (toast) => {
        const id = createToastId();
        set((state) => ({
            toasts: [...state.toasts, { id, ...toast }],
        }));

        window.setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((item) => item.id !== id),
            }));
        }, 3500);
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((item) => item.id !== id),
        })),
    clearToasts: () => set({ toasts: [] }),
}));
