"use client";

import React from 'react';
import Link from 'next/link';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Mi Aplicación</h1>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link href="/dashboard/profile" className="hover:text-blue-200">
              Perfil
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow bg-gray-100">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
} 