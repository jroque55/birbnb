'use client'
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';
import ContenidoNoEncontrado from "@/app/components/not_found/ContenidoNoEncontrado";
import axios from "axios";
import "./ReservaAnfitriones.css"
import Loading from "@/app/components/loading/loading";
import Pagination from "@/app/components/paginacion/paginacion";
const URI = process.env.PUBLIC_API_URL || "http://localhost3000"

export default function ReservaAnfitrion() {
  const router = useRouter()
  const pathname = usePathname()
  const { anfitrionId } = useParams();
  const searchParams = useSearchParams()
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pagination, setPagination] = useState({
      currentPage: 1,
      totalPages: 1,
      totalDocuments: 0,
      NextPage: false,
      PrevPage: false,
    });
 const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;

      useEffect(() => {
        const timer = setTimeout(() => {
          setPageLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

  useEffect(() => {
    const fetchReservasAnfitrion = async () => {
      try {
        setError(null)
        const params = {
          page: currentPage,
          limit: limit,
        };
        const response = await axios.get(URI+`/reservas/anfitriones/${anfitrionId}`,{params});
        setReservas(response.data.data || []);
        setPagination(
          response.data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalDocuments: 0,
            hasNextPage: false,
            hasPrevPage: false,
          })
      } catch (err) {
        setError("No se encontraron reservas");
        setReservas([])
      }
    };
    fetchReservasAnfitrion();
  }, [anfitrionId, currentPage, limit]);

  const handleAction = async (reservaId, action) => {
    try {
      await axios.patch(URI+`/reservas/${reservaId}/estado`, { 
        nuevoEstado: action.toUpperCase() 
      });
      
      setReservas(reservas.map(reserva => 
        reserva._id === reservaId ? { ...reserva, estado: action.toUpperCase() } : reserva
      ));
    } catch (error) {
      setError(error.response?.data?.message || "Error al actualizar el estado");
    }
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pageLoading) return <Loading/>;
  if (reservas.length === 0) return <ContenidoNoEncontrado elemento="reservas para el anfitrión" acciones="volver atras" />;

  return (
    <div  style={{ padding: '20px' }}>
     <div className="reservas-container">
      <h1>Solicitudes de Reserva</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Alojamiento</TableCell>
              <TableCell>Huésped</TableCell>
              <TableCell>Fechas</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva._id}>
                <TableCell>{reserva.alojamiento?.nombre || 'N/A'}</TableCell>
                <TableCell>{reserva.huespedReservador?.nombre || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(reserva.rangoDeFechas.fechaInicio).toLocaleDateString()} - 
                  {new Date(reserva.rangoDeFechas.fechaFin).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={reserva.estado} 
                    color={
                      reserva.estado === 'PENDIENTE' ? 'warning' :
                      reserva.estado === 'CONFIRMADA' ? 'success' : 'error'
                    } 
                  />
                </TableCell>
                <TableCell >
                  {reserva.estado === 'PENDIENTE' && (
                    <>
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        onClick={() => handleAction(reserva._id, 'CONFIRMADA')}
                        style={{ margin: '8px' }}
                      >
                        Aprobar
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        onClick={() => handleAction(reserva._id, 'CANCELADA')}
                      >
                        Rechazar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalDocuments={pagination.totalDocuments}
          />
      </div>
    </div>
  );
}