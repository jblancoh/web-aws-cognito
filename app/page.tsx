"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        // Usuario autenticado, redirigir al dashboard
        router.push("/dashboard");
      } catch (error) {
        // Usuario no autenticado, mostrar la página de inicio
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Bienvenido</h1>
          <p className="mt-2 text-sm text-gray-600">
            Inicia sesión o regístrate para comenzar
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/auth"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar sesión / Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}