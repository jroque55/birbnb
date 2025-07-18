"use client";
import { Button, Menu, MenuItem, Avatar, CircularProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { authContext } from "../../AuthContext";
import { useContext, useState, useEffect } from "react";
import "./LoginButton.css";
import MenuIcon from "@mui/icons-material/Menu";

export default function LoginButton() {
  const router = useRouter();
  const { user, isAuthenticated, logout, loading } = useContext(authContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLocalLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  if (loading || localLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button 
        className="button-login" 
        onClick={() => router.push("/auth/login")}
        sx={{ textTransform: 'uppercase' }}
      >
        INICIÁ SESIÓN
      </Button>
    );
  }

  const baseMenuItems = [
    {
      label: "Notificaciones",
      action: () => router.push(`/notificaciones/${user?.id}`)
    },
    {
      label: "Reservas",
      action: () => router.push(`/reservas/${user?.id}`)
    },
    {
      label: "Cerrar Sesión",
      action: () => {
        logout();
        router.push('/');
      }
    }
  ];

  if (user?.tipo === "ANFITRION") {
    const menuItems = [
      ...baseMenuItems.slice(0, 2),
      {
        label: "Solicitudes de Reserva",
        action: () => router.push(`/reservas/anfitriones/${user?.id}`)
      },
      ...baseMenuItems.slice(2)
    ];

    return (
      <>
        <Button 
          className="button-login" 
          onClick={handleMenuOpen}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <MenuIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              onClick={() => {
                item.action();
                handleMenuClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <>
      <Button 
        className="button-login" 
        onClick={handleMenuOpen}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <MenuIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {baseMenuItems.map((item, index) => (
          <MenuItem 
            key={index} 
            onClick={() => {
              item.action();
              handleMenuClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}