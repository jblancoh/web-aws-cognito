import "./amplifyConfig"; // Importa la configuración de Amplify
import Auth from "@/components/Auth";

export default function Page() {
  return (
    <main>
      <h1>My Next.js App with Cognito</h1>
      <Auth />
    </main>
  );
}