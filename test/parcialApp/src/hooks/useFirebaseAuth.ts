import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/config";

const getErrorMessage = (err: unknown): string => {
  if (!(err instanceof FirebaseError)) return "Ocurrio un error. Intenta de nuevo.";

  // Firebase v9+ unifica auth/user-not-found y auth/wrong-password en auth/invalid-credential
  switch (err.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email o contrasena incorrectos.";
    case "auth/invalid-email":
      return "El formato del email no es valido.";
    case "auth/too-many-requests":
      return "Demasiados intentos fallidos. Espera unos minutos.";
    case "auth/email-already-in-use":
      return "Ese email ya tiene una cuenta. Inicia sesion en vez de registrarte.";
    case "auth/weak-password":
      return "La contrasena es muy debil. Usa al menos 6 caracteres.";
    case "auth/network-request-failed":
      return "Sin conexion a internet. Verifica tu red.";
    case "auth/operation-not-allowed":
      return "El login con email no esta habilitado. Contacta al administrador.";
    default:
      return `Error: ${err.code}`;
  }
};

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), password);
      return res;
    } catch (err: unknown) {
      console.error("[useFirebaseAuth] signIn error:", err);
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
      return res;
    } catch (err: unknown) {
      console.error("[useFirebaseAuth] signUp error:", err);
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, loading, error };
};
