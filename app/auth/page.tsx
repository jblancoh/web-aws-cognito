'use client';

import { Auth } from '@/components/Auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';

export default function AuthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await getCurrentUser();
                // Usuario ya autenticado, redirigir al dashboard
                router.push('/dashboard');
            } catch (error) {
                // Usuario no autenticado, mostrar el formulario de login
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Auth />
            </div>
        </div>
    );
} 