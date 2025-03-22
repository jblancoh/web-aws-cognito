"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator, ThemeProvider, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Definir los campos del formulario
const formFields = {
  signUp: {
    email: {
      order: 1,
      isRequired: true,
      placeholder: 'Correo electrónico',
      label: 'Correo electrónico'
    },
    password: {
      order: 2,
      isRequired: true,
      placeholder: 'Contraseña',
      label: 'Contraseña'
    },
    confirm_password: {
      order: 3,
      isRequired: true,
      placeholder: 'Confirmar contraseña',
      label: 'Confirmar contraseña'
    },
    name: {
      order: 4,
      isRequired: true,
      label: 'Nombre completo',
      placeholder: 'Nombre completo'
    },
    address: {
      order: 5,
      isRequired: true,
      label: 'Dirección',
      placeholder: 'Dirección'
    },
    phone_number: {
      order: 6,
      isRequired: true,
      label: 'Teléfono (formato +1234567890)',
      placeholder: 'Formato: +1234567890'
    }
  },
  signIn: {
    username: {
      order: 1,
      isRequired: true,
      placeholder: 'Correo electrónico',
      label: 'Correo electrónico'
    },
    password: {
      order: 2,
      isRequired: true,
      placeholder: 'Contraseña',
      label: 'Contraseña'
    }
  }
};

// Tema personalizado para el Authenticator
const theme = {
  name: 'Auth Custom Theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0f9ff',
          20: '#e0f2fe',
          40: '#bae6fd',
          60: '#38bdf8',
          80: '#0284c7',
          90: '#0369a1',
          100: '#075985'
        }
      }
    },
    components: {
      authenticator: {
        router: {
          borderWidth: '0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
        },
        container: {
          widthMax: '500px'
        },
        footer: {
          paddingBottom: '2rem'
        }
      },
      button: {
        fontWeight: '600'
      }
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
            ¡Bienvenido!
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
    <ThemeProvider theme={theme}>
      <View className="flex justify-center items-center p-4">
        <Authenticator 
          formFields={formFields}
          signUpAttributes={['name', 'email', 'address', 'phone_number']}
          loginMechanisms={['email']}
          hideSignUp={false}
          variation="modal"
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
      </View>
    </ThemeProvider>
  );
} 