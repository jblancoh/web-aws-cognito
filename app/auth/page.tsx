'use client';

import { Auth } from '@/components/Auth';

export default function AuthPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Auth />
            </div>
        </div>
    );
} 