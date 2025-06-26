import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthResponse, RegisterCredentials } from "../types/auth";

export const useSignInController = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.type === "email"
        ? "email"
        : e.target.type === "password"
        ? "password"
        : "username"]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3000/api/auth/register",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      navigate("/index");
    } catch (err) {
      setError("Échec de l'inscription. Vérifiez vos informations.");
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    setCredentials,
    handleChange,
    handleSubmit,
    error,
    isLoading,
  };
};
