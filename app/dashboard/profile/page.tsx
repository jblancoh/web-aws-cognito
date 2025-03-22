"use client";

import React, { useEffect, useState } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserData = {
  username: string;
  name?: string;
  email?: string;
  address?: string;
  phone_number?: string;
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        setUserData({
          username: user.username,
          name: attributes.name,
          email: attributes.email,
          address: attributes.address,
          phone_number: attributes.phone_number
        });
      } catch (error) {
        console.error('Error al obtener datos de usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center">
        <div className="text-center">
          <p className="text-lg">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      
      {userData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nombre de usuario</h3>
                <p className="text-lg">{userData.username}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                <p className="text-lg">{userData.name || 'No disponible'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                <p className="text-lg">{userData.email || 'No disponible'}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                <p className="text-lg">{userData.address || 'No disponible'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                <p className="text-lg">{userData.phone_number || 'No disponible'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-lg text-red-500">No se pudieron cargar los datos del usuario</p>
        </div>
      )}
    </div>
  );
} 