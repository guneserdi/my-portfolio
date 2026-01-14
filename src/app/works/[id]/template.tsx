'use client';

import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Sayfa şablonu her yüklendiğinde tarayıcıyı en tepeye ışınla
        window.scrollTo(0, 0);
    }, []);

    return <>{children}</>;
}