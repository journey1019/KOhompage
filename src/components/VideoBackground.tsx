'use client';

import { useEffect, useState } from 'react';

interface VideoBackgroundProps {
    src: string;
}

export default function VideoBackground({ src }: VideoBackgroundProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // 클라이언트에서만 비디오를 렌더링
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={src}
            autoPlay
            loop
            muted
            playsInline
        />
    );
}
