// Este archivo ya no se utiliza para la configuración de Amplify
// La configuración ahora se maneja en components/AmplifyProvider.tsx

// Se mantienen las variables de entorno para depuración
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const userPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOL_ID;
const userPoolClientId = process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID;

// Log para depuración
console.log("AWS Config values:", { region, userPoolId, userPoolClientId });

// Exportar las variables para uso en otras partes de la aplicación si es necesario
export const awsConfig = {
  region,
  userPoolId,
  userPoolClientId,
};

export default awsConfig; 