// --- 작은 유틸/아톰들 (파일 상단 or 컴포넌트 상단에 추가) -----------------------
export function SectionCard({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
                {right}
            </div>
            <div className="p-4">{children}</div>
        </div>
    );
}

export function KV({ k, v, mono = false }: { k: string; v?: React.ReactNode; mono?: boolean }) {
    return (
        <div className="flex justify-between py-2">
            <span className="text-gray-500">{k}</span>
            <span className={`font-medium ${mono ? 'font-mono' : ''}`}>{v ?? '-'}</span>
        </div>
    );
}
