"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';
import Dashboard from '@/dashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        // Usuario está autenticado, puede quedarse en el dashboard
        setIsAuthenticated(true);
      } catch (error) {
        console.error('No hay sesión de usuario', error);
        // Redirigir a la página de inicio/login si no hay sesión
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    // Pequeño retraso para asegurar que la sesión se haya establecido correctamente
    setTimeout(() => {
      checkUser();
    }, 500);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // No renderizamos nada mientras se redirige
  }

  return <Dashboard />;
} 