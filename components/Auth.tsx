"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser } from 'aws-amplify/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Definir los campos del formulario
const formFields = {
  signUp: {
    email: {
      order: 1,
      isRequired: true,
    },
    username: {
      order: 2,
      isRequired: true,
    },
    password: {
      order: 3,
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      isRequired: true,
    },
    name: {
      order: 5,
      isRequired: true,
      label: 'Nombre completo'
    },
    address: {
      order: 6,
      isRequired: true,
      label: 'Dirección'
    },
    phone_number: {
      order: 7,
      isRequired: true,
      label: 'Teléfono (formato +1234567890)'
    }
  }
};

// Tipos para el componente AuthenticatedContent
interface AuthenticatedContentProps {
  user: any;
  signOut: any;
  authError: string | null;
  router: AppRouterInstance;
}

// Componente separado para el contenido autenticado
function AuthenticatedContent({ user, signOut, authError, router }: AuthenticatedContentProps) {
  // Aquí usamos useEffect de manera segura
  React.useEffect(() => {
    if (user) {
      console.log("Usuario autenticado, redirigiendo...");
      const redirectTimer = setTimeout(() => {
        router.push('/dashboard');
      }, 800);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [user, router]);
  
  return (
    <div className="p-4">
      {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {authError}
        </div>
      )}
      
      {user ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            ¡Bienvenido, {user.username}!
          </h1>
          <p className="mb-4">Redirigiendo al dashboard...</p>
          <button
            onClick={() => signOut && signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export function Auth() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  return (
    <Authenticator 
      formFields={formFields}
      signUpAttributes={['name', 'email', 'address', 'phone_number']}
    >
      {({ signOut, user }) => (
        <AuthenticatedContent 
          user={user} 
          signOut={signOut} 
          authError={authError} 
          router={router} 
        />
      )}
    </Authenticator>
  );
} 