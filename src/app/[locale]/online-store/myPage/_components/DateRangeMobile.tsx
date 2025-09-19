import { todayDash, ymd } from '@/lib/utils/dateUtils';
import { toDash } from '@/module/helper';
/* ---------- 모바일 최적화 날짜 범위 컴포넌트 ---------- */

type DateRange = { start: string; end: string };
type DateRangeProps = {
    uiRange: DateRange;                          // yyyy-MM-dd
    onChange: (next: DateRange) => void;
    onApply: () => void;
    busy?: boolean;
};
function DateRangeMobile({ uiRange, onChange, onApply, busy }: DateRangeProps) {
    const td = todayDash();

    const setK = (k: 'start' | 'end') => (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange({ ...uiRange, [k]: e.target.value });

    // 프리셋: 7/30/90일·오늘
    const setPreset = (days: number) => {
        const end = new Date();
        const start = new Date();
        if (days === 0) {
            const t = todayDash();
            onChange({ start: t, end: t });
            return;
        }
        start.setDate(start.getDate() - days);
        onChange({ start: toDash(ymd(start)), end: toDash(ymd(end)) });
    };

    return (
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
            {/* 라벨 줄 */}
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">조회 기간</h3>
                {/* 프리셋: 모바일 한 줄 스크롤 */}
                <div className="flex gap-1 overflow-x-auto [-webkit-overflow-scrolling:touch]">
                    <button onClick={() => setPreset(7)}  className="rounded-full border px-3 py-2 text-xs sm:text-sm hover:bg-gray-50">7일</button>
                    <button onClick={() => setPreset(30)} className="rounded-full border px-3 py-2 text-xs sm:text-sm hover:bg-gray-50">30일</button>
                    <button onClick={() => setPreset(90)} className="rounded-full border px-3 py-2 text-xs sm:text-sm hover:bg-gray-50">90일</button>
                    <button onClick={() => setPreset(0)}  className="rounded-full border px-3 py-2 text-xs sm:text-sm hover:bg-gray-50">오늘</button>
                </div>
            </div>

            {/* 입력 줄: 모바일 1열, md부터 3열 정렬 */}
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-[1fr,1fr,auto]">
                <div className="flex flex-col">
                    <label className="mb-1 text-xs sm:text-sm text-gray-600">시작일</label>
                    <input
                        type="date"
                        className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={uiRange.start}
                        onChange={setK('start')}
                        max={td}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-xs sm:text-sm text-gray-600">종료일</label>
                    <input
                        type="date"
                        className="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={uiRange.end}
                        onChange={setK('end')}
                        max={td}
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={onApply}
                        disabled={busy}
                        className={`h-11 w-full md:w-auto rounded-md px-4 text-sm font-semibold text-white ${
                            busy ? 'bg-gray-400' : 'bg-gray-800 hover:bg-gray-900'
                        }`}
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DateRangeMobile;