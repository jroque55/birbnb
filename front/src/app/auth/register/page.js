"use client";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Card,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import Loading from "@/app/components/loading/loading";
const URI = process.env.PUBLIC_API_URL || "http://localhost3000"

export default function RegisterContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipoUsuario] = useState("HUESPED");
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        URI+"/auth/register",
        { email, password, nombre, tipo },
        {
          withCredentials: true,
        }
      );
      if (response) {
        window.location.reload(true);
        router.back();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  const handleTipoUsuarioChange = (event, newTipoUsuario) => {
    if (newTipoUsuario !== null) {
      setTipoUsuario(newTipoUsuario);
    }
  };

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <div className="root" style={{ padding: "20px" }}>
      <Card className="form-container">
        <h1 style={{ textAlign: "center" }}>REGISTRARSE</h1>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
              variant="outlined"
              label="Nombre"
              required
            />
            <TextField
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              label="Email"
              required
            />
            <TextField
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              label="Contraseña"
              required
            />

            <ToggleButtonGroup
              value={tipo}
              exclusive
              onChange={handleTipoUsuarioChange}
              fullWidth
              sx={{ my: 1 }}
            >
              <ToggleButton value="HUESPED" sx={{ width: "50%" }}>
                Huésped
              </ToggleButton>
              <ToggleButton value="ANFITRION" sx={{ width: "50%" }}>
                Anfitrión
              </ToggleButton>
            </ToggleButtonGroup>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => router.push("/auth/login")}
                disabled={pageLoading}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!email || !password || !nombre || loading}
                variant="contained"
                fullWidth
              >
                {pageLoading ? "Cargando..." : "Registrarse"}
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </div>
  );
}
