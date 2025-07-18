import dayjs from "dayjs";
import "./Notificaciones.css";
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { Tooltip, IconButton, Snackbar, Alert } from "@mui/material";
import {Checkbox} from "@mui/material";


export default function NotificacionCard({ notificacion, onMarkAsRead }) {
  const [error, setError] = useState(null);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [loading, setIsLoading] = useState(false)

  const handleLeerNotificacion = async () => {
    if (notificacion.leida) return;
    
    setIsLoading(true);
    try {
      await axios.patch(
        `http://localhost:3000/notificaciones/${notificacion._id}`
      );
      onMarkAsRead(notificacion._id);
      setIsOpenSnackbar(true);
    } catch (err) {
      setError("No se pudo marcar como leída");
      setIsOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setIsOpenSnackbar(false);

  return (
    <>
      <div className={`notificacion-container ${notificacion.leida ? 'leida' : 'no-leida'}`}>
        <div className="notificacion-content">
          <span className="fecha">
            {dayjs(notificacion.fechaAlta).format('DD/MM/YYYY HH:mm')}
          </span>
          
          <p className="texto"><Tooltip title={notificacion.leida ? "Ya leída" : "Marcar como leída"}>
          <Checkbox
            onClick={handleLeerNotificacion}
            disabled={notificacion.leida}
            aria-label={notificacion.leida ? "Notificación leída" : "Marcar como leída"}
            size="small"
          >
            {notificacion.leida ? (
              <CheckCircleOutline/>
            ) : (
              <RadioButtonUnchecked/>
            )}
          </Checkbox>
        </Tooltip>{notificacion.mensaje}</p>
        </div>
        
        
      </div>

      <Snackbar open={isOpenSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"}>
          {error || "Notificación marcada como leída"}
        </Alert>
      </Snackbar>
    </>
  );
}