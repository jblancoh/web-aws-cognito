import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export function Auth() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="p-4">
          {user ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">
                ¡Bienvenido, {user.username}!
              </h1>
              <button
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      )}
    </Authenticator>
  );
} 