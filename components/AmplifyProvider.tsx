"use client";

import React, { useEffect } from "react";
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Configurar Amplify con almacenamiento de cookies en el lado del cliente
    if (typeof window !== 'undefined') {
      const awsConfig = {
        Auth: {
          Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || '',
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID || '',
            loginWith: { 
              email: true,
              username: false
            },
            // Asegurar que las credenciales se almacenen correctamente
            storage: 'localStorage',
            tokenRefreshMode: 'expired-token'
          }
        }
      };

      // Configurar almacenamiento de tokens en cookies
      const cookieStorage = new CookieStorage({
        domain: window.location.hostname,
        path: '/',
        expires: 365,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Establecer el proveedor de almacenamiento para los tokens
      cognitoUserPoolsTokenProvider.setKeyValueStorage(cookieStorage);
      
      // Configurar Amplify con manejo mejorado de sesiones
      Amplify.configure(awsConfig, { ssr: true });
      
      console.log("Amplify configurado correctamente en el cliente");
    }
  }, []);

  return <>{children}</>;
} 