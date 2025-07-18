"use client";
import { useRouter } from "next/navigation";
import { Alert, Button, Card, TextField, Box, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import "./Login.css";
import Loading from "@/app/components/loading/loading";
import { authContext } from "@/app/AuthContext";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const { login, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      await login(email, password);
      router.refresh();
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setFormLoading(false);
    }
  };

  if (pageLoading || isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <div className="root">
      <Card className="form-container">
        <h1 className="titulo">Inicio de Sesión</h1>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField className="entrada"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
            label="Email"
            required
            disabled={formLoading}
          />
          <TextField className="entrada"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="standard"
            label="Contraseña"
            required
            inputProps={{
              autoComplete: "current-password", 
              "aria-label": "Contraseña", 
            }}
            disabled={formLoading}
          />
          <div className="actions">
            <div className="recordar">¿Olvido su contraseña?</div>
            <Button className="iniciar-sesion"
              type="submit"
              disabled={!email || !password || formLoading}
              variant="contained"
            >
              {formLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </div>
        </form>
        <Box>
          <Typography className="registrarse" variant="standard">¿No tienes una cuenta?
            <Button 
            variant="text"
            onClick={() => router.push("/auth/register")}
            disabled={formLoading}
          >
            Regístrate aquí
          </Button>
          </Typography>
          
        </Box>
      </Card>
    </div>
  );
}
