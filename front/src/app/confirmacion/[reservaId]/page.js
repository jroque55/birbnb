"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Typography,Paper,Grid,Chip,Divider,List,ListItem,ListItemIcon,ListItemText,Avatar,} from "@mui/material";
import {TaskAlt as TaskAltIcon,Home as HomeIcon,CalendarToday as CalendarIcon,People as PeopleIcon,MonetizationOn as PriceIcon,LocationOn as LocationIcon,CheckCircle as CheckIcon,AccessTime as TimeIcon,} from "@mui/icons-material";
import Loading from "@/app/components/loading/loading";

export default function ConfirmacionPage() {
  const { reservaId } = useParams();
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reservas/${reservaId}`
        );
        setReserva(response.data);
      } catch (err) {
        setError("Hubo un error al procesar la confirmación de reserva");
      } finally {
        setPageLoading(false);
      }
    };
    fetchReserva();
  }, [reservaId]);

  if (pageLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!reserva) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar
            sx={{
              bgcolor: "success.main",
              width: 60,
              height: 60,
              mx: "auto",
              mb: 2,
            }}
          >
            <TaskAltIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            ¡Reserva confirmada!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tu reserva ha sido creada con éxito
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon color="primary" sx={{ mr: 1 }} />
              Alojamiento
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                {reserva.alojamiento?.nombre}
              </Typography>
              <Typography variant="body1" paragraph>
                {reserva.alojamiento?.descripcion}
              </Typography>

              {reserva.alojamiento?.fotos?.[0]?.path && (
                <Box sx={{ mt: 2, mb: 3 }}>
                  <img
                    src={reserva.alojamiento.fotos[0].path}
                    alt={reserva.alojamiento.nombre}
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      maxHeight: 200,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Características:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {reserva.alojamiento?.caracteristicas?.map((caract, index) => (
                <Chip key={index} label={caract} size="small" />
              ))}
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Ubicación:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationIcon color="primary" sx={{ mr: 1 }} />
              <Typography>
                {reserva.alojamiento?.direccion?.calle}{" "}
                {reserva.alojamiento?.direccion?.altura},{" "}
                {reserva.alojamiento?.direccion?.ubicacion?.ciudad}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CheckIcon color="primary" sx={{ mr: 1 }} />
              Detalles de tu reserva
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Fechas"
                  secondary={`${new Date(
                    reserva.rangoDeFechas.fechaInicio
                  ).toLocaleDateString()} - ${new Date(
                    reserva.rangoDeFechas.fechaFin
                  ).toLocaleDateString()}`}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Huéspedes"
                  secondary={`${reserva.cantHuespedes} ${
                    reserva.cantHuespedes === 1 ? "persona" : "personas"
                  }`}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PriceIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Precio por noche"
                  secondary={`${reserva.alojamiento?.precioPorNoche} ${reserva.alojamiento?.moneda}`}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <TimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Horarios"
                  secondary={`Check-in: ${
                    reserva.alojamiento?.horarioCheckIn || "Flexible"
                  }, Check-out: ${
                    reserva.alojamiento?.horarioCheckOut || "Flexible"
                  }`}
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
              <Box
                sx={{ mt: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}
              >
                <Typography
                  component="div" 
                  variant="body2"
                  color="text.secondary"
                >
                  Estado actual:{" "}
                  <Chip
                    label={reserva.estado}
                    color={
                      reserva.estado === "CONFIRMADA" ? "success" : "primary"
                    }
                    size="small"
                    sx={{ ml: 1 }} 
                  />
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Código de reserva: {reserva._id}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Recibirás un correo electrónico con los detalles de tu reserva.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
