/** src/components/QuantitySelector.tsx */
import React from 'react';

export default function QuantitySelector({
                                             value, onChange, min = 1, max = 99,
                                         }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
    return (
        <div className="inline-flex items-center space-x-2">
            <button className="px-2 py-1 border rounded" onClick={() => onChange(Math.max(min, value - 1))}>-</button>
            <input
                type="number"
                className="w-14 border rounded text-center"
                value={value}
                min={min}
                max={max}
                onChange={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isNaN(n)) onChange(Math.min(Math.max(min, n), max));
                }}
            />
            <button className="px-2 py-1 border rounded" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
        </div>
    );
}
