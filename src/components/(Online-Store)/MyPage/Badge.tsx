// src/app/[locale]/online-store/superAdmin/paid/components/Badge.tsx
import React from "react";

export type BadgeTone = "green" | "red" | "yellow" | "blue" | "gray";

const toneClasses: Record<BadgeTone, string> = {
    green: "bg-green-50 text-green-700 ring-green-600/20",
    red: "bg-red-50 text-red-700 ring-red-600/20",
    yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
    gray: "bg-gray-50 text-gray-700 ring-gray-600/20",
};

export function Badge({
                          children,
                          tone = "gray",
                      }: {
    children: React.ReactNode;
    tone?: BadgeTone;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${toneClasses[tone]}`}
        >
      {children}
    </span>
    );
}
