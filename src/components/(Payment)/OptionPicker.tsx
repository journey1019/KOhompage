import React from 'react';
import { OptionGroup } from '@/lib/api/paidApi';

export default function OptionPicker({
                                         groups, value, onChange,
                                     }: {
    groups: OptionGroup[];
    value: Record<string, string[]>; // groupId -> 선택된 key[]
    onChange: (next: Record<string, string[]>) => void;
}) {
    const toggle = (groupId: string, key: string, multi?: boolean) => {
        const cur = value[groupId] || [];
        let next: string[] = [];
        if (multi) {
            next = cur.includes(key) ? cur.filter(k => k !== key) : [...cur, key];
        } else {
            next = cur.includes(key) ? [] : [key];
        }
        onChange({ ...value, [groupId]: next });
    };

    return (
        <div className="space-y-3">
            {groups.map((g) => (
                <div key={g.id}>
                    <div className="text-sm font-medium mb-1">
                        {g.name} {g.required ? <span className="text-red-500">*</span> : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {g.values.map((v) => {
                            const active = (value[g.id] || []).includes(v.key);
                            return (
                                <button
                                    key={v.key}
                                    type="button"
                                    onClick={() => toggle(g.id, v.key, g.multi)}
                                    className={`px-3 py-1 rounded border ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                >
                                    {v.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
