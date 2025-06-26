import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthResponse, LoginCredentials } from "../types/auth";

export const useLoginController = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.type === "email" ? "email" : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3000/api/auth/login",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      console.error("Login failed:", err);
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
