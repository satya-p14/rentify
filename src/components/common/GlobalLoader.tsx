'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function GlobalLoader() {
    const loading = useSelector((state: RootState) => state.loader.loading);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
