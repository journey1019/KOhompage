// ————————————————————————————————————————————————
// Small UI atoms
// ————————————————————————————————————————————————

export function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "green" | "red" | "yellow" | "blue" | "gray" }) {
    const map: Record<string, string> = {
        green: "bg-green-50 text-green-700 ring-green-600/20",
        red: "bg-red-50 text-red-700 ring-red-600/20",
        yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
        gray: "bg-gray-50 text-gray-700 ring-gray-600/20",
    };
    return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[tone]}`}>{children}</span>;
}


export function classNames(...xs: (string | false | null | undefined)[]) {
    return xs.filter(Boolean).join(" ");
}


export function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: 9 }).map((_, i) => (
                <td key={i} className="p-3">
                    <div className="h-4 w-full rounded bg-gray-200" />
                </td>
            ))}
        </tr>
    );
}