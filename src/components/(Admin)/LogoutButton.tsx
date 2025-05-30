// src/components/(Admin)/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/ko/auth/signin" })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            type="button"
        >
            로그아웃
        </button>
    );
}
