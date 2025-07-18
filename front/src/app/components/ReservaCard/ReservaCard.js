import { Chip } from '@mui/material';
import { FaCalendarAlt, FaUserFriends, FaHome, FaInfoCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import './ReservaCard.css'

export default function ReservaCard({ reserva }) {
  return (
    <div className="reserva-card">
      <div className="reserva-content">
        <h2 className="reserva-title">
          {reserva.alojamiento?.nombre || 'Alojamiento no disponible'}
        </h2>
        
        <div className="reserva-detail">
          <FaHome className="reserva-icon" />
          <span>
            {reserva.alojamiento?.direccion?.ubicacion?.ciudad || 'Ubicación no disponible'}
          </span>
        </div>
        
        <div className="reserva-detail">
          <FaCalendarAlt className="reserva-icon" />
          <span>
            {dayjs(reserva.rangoDeFechas.fechaInicio).format('DD/MM/YYYY')} - {dayjs(reserva.rangoDeFechas.fechaFin).format('DD/MM/YYYY')}
          </span>
        </div>
        
        <div className="reserva-detail">
          <FaUserFriends className="reserva-icon" />
          <span>
            {reserva.cantHuespedes} huésped{reserva.cantHuespedes !== 1 ? 'es' : ''}
          </span>
        </div>
        
        <div className="reserva-status">
          <Chip 
            label={reserva.estado}
            color={
              reserva.estado === 'CONFIRMADA' ? 'success' :
              reserva.estado === 'CANCELADA' ? 'error' : 'warning'
            }
          />
        </div>
      </div>
    </div>
  );
}