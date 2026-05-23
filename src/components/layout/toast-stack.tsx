"use client";

import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import { useToastStore } from "@/stores/toast-store";

const iconMap = {
    default: Info,
    success: CheckCircle2,
    error: CircleAlert,
    info: Info,
};

export function ToastStack() {
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);

    return (
        <div className="pointer-events-none fixed right-4 top-24 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:w-full">
            {toasts.map((toast) => {
                const Icon = iconMap[toast.variant ?? "default"];

                return (
                    <div
                        key={toast.id}
                        className="pointer-events-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-slate-100 p-2 text-slate-700">
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-950">{toast.title}</p>
                                {toast.description ? <p className="mt-1 text-sm leading-6 text-slate-600">{toast.description}</p> : null}
                            </div>
                            <button
                                type="button"
                                aria-label="Dismiss toast"
                                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                onClick={() => removeToast(toast.id)}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
