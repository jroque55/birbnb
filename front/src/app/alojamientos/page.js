"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import HotelCard from "../components/HotelCard/HotelCard.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/loading/loading.js";
import Pagination from "../components/paginacion/paginacion.js";
import ContenidoNoEncontrado from "../components/not_found/ContenidoNoEncontrado.js";
import "./page.css";
import Navbar from "../components/navbar/Navbar.js";
const URI = process.env.PUBLIC_API_URL || "http://localhost3000"

const AlojamientosContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pageLoading, setPageLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState([]);
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
    const fetchData = async () => {
      try {
        setError(null);

        const params = {
          ciudad: searchParams.get("ubication"),
          personLimit: searchParams.get("personLimit"),
          precioGt: searchParams.get("precioGt"),
          precioLt: searchParams.get("precioLt"),
          fechaInicio: searchParams.get("fechaInicio"),
          fechaFin: searchParams.get("fechaFin"),
          caracteristica: searchParams.get("caracteristica"),
          page: currentPage,
          limit: limit,
        };

        const response = await axios.get(URI+"/alojamientos", {
          params,
        });

        setApiResponse(response.data.data || []);
        setPagination(
          response.data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalDocuments: 0,
            hasNextPage: false,
            hasPrevPage: false,
          }
        );
      } catch (err) {
        setError(err.message);
        setApiResponse([]);
      } 
    };

    fetchData();
  }, [searchParams, currentPage, limit]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pageLoading) {
    return <Loading />;
  }
  if (error)
    return (
      <ContenidoNoEncontrado
        elemento={"alojamientos que cumplan la condicion"}
        acciones={null}
      />
    );

  return (
    <div
      style={{ padding: "12px", maxWidth: "1800px", margin: "0 auto" }}
      className="container-alo"
    >
      <div
        style={{
          marginBottom: "20px",
          padding: "0 16px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        <p>
          Mostrando {apiResponse.length} de {pagination.totalDocuments}{" "}
          alojamientos
          {pagination.totalPages > 1 &&
            ` - Página ${pagination.currentPage} de ${pagination.totalPages}`}
        </p>
      </div>

      <div className="contenedor-ofertas">
        {apiResponse.map((alojamiento, index) => (
          <HotelCard
            className="contenedor-card"
            key={`${alojamiento.id}-${pagination.currentPage}-${index}`}
            name={alojamiento.nombre}
            location={
              alojamiento.direccion?.ubicacion?.ciudad ||
              "Ubicación desconocida"
            }
            imageUrl={alojamiento.fotos[0].path}
            price={alojamiento.precioPorNoche}
            id={alojamiento.id}
          />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalDocuments={pagination.totalDocuments}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default function AlojamientosPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar></Navbar>
      <AlojamientosContent />
    </Suspense>
  );
}
