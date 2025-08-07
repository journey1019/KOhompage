'use client';

import { useEffect, useState } from 'react';

interface TokenCountdownTimerProps {
    tokenExpired: string; // "2025-08-08 09:24:32"
}

export default function TokenCountdownTimer({ tokenExpired }: TokenCountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState('00:00');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const expire = new Date(tokenExpired.replace(' ', 'T'));
            const diffMs = expire.getTime() - now.getTime();

            if (diffMs <= 0) {
                return '00:00';
            }

            const totalMinutes = Math.floor(diffMs / 1000 / 60); // 총 남은 분
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            return formatted;
        };

        // 최초 실행
        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60 * 1000); // 매 분마다 갱신

        return () => clearInterval(interval);
    }, [tokenExpired]);

    return (
        <span className="text-base text-gray-700 font-medium">
      남은 시간: {timeLeft}
    </span>
    );
}
