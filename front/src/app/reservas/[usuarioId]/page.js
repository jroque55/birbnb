"use client";
import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import ReservaCard from "@/app/components/ReservaCard/ReservaCard";
import Loading from "@/app/components/loading/loading";
import "./Reserva.css";
import ContenidoNoEncontrado from "@/app/components/not_found/ContenidoNoEncontrado";
import Pagination from "@/app/components/paginacion/paginacion";

export default function ReservasUsuarioPage() {
  const router = useRouter();
  const { usuarioId } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
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
    const fetchReservas = async () => {
      try {
        setError(null);
        const params = {
          page: currentPage,
          limit: limit,
        };
        const response = await axios.get(
          `http://localhost:3000/reservas/usuarios/${usuarioId}`,
          { params }
        );
        setReservas(response.data.data || []);
        setPagination(
          response.data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalDocuments: 0,
            hasNextPage: false,
            hasPrevPage: false,
          }
        );
        console.log(response.data);
      } catch (err) {
        setError("Error al cargar reservas");
        setReservas([]);
      }
    };

    fetchReservas();
  }, [usuarioId, currentPage, limit]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pageLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (reservas.length === 0) {
    return (
      <ContenidoNoEncontrado
        elemento={"reservas para el usuario"}
        acciones={"volver atras"}
      />
    );
  }

  return (
    <div className="reservas-container">
      <h1 className="reservas-title">Mis Reservas</h1>

      <div className="reservas-grid">
        {reservas.map((reserva, index) => (
          <ReservaCard
            key={`${reserva._id}-${pagination.currentPage}-${index}`}
            reserva={reserva}
          />
        ))}
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        totalDocuments={pagination.totalDocuments}
      />
    </div>
  );
}
