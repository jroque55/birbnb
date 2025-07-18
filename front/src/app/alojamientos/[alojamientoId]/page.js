"use client";

import Alert from "@mui/material/Alert";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import {
  FaCheck,
  FaCalendarAlt,
  FaUserFriends,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
  FaUtensils,
  FaTv,
  FaPaw,
  FaClock,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import axios from "axios";
import Loading from "../../components/loading/loading";
import "./AlojamientoDetail.css";
import { authContext } from "@/app/AuthContext";
import ContenidoNoEncontrado from "@/app/components/not_found/ContenidoNoEncontrado";

const URI = process.env.PUBLIC_API_URL || "http://localhost3000"

const AlojamientoDetalle = () => {
  const dropdownRef = useRef(null);
  const params = useParams();
  const alojamientoId = params?.alojamientoId;
  const [alojamiento, setAlojamiento] = useState(null);
  const [errorReserva, setErrorReserva] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const router = useRouter();
  const { user } = useContext(authContext);
  const today = new Date();
  const [startDate, endDate] = dateRange;
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuests(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (alojamientoId) {
      const fetchAlojamiento = async () => {
        try {
          const response = await axios.get(
            URI + `alojamientos/${alojamientoId}`
          );
          if (!response.data) {
            throw new Error("Alojamiento no encontrado");
          }
          setAlojamiento(response.data);
        } catch (err) {
          setErrorReserva(err.message);
        }
      };
      fetchAlojamiento();
    }
  }, [alojamientoId]);

 if (pageLoading) {
    return <Loading />;
  }
  if (!alojamiento)
    return (
      <ContenidoNoEncontrado
        elemento={"alojamientos con ese id"}
        acciones={"volver atras"}
      />
    );

  const clearFilters = () => {
    setDateRange([null, null]);
    setGuests(2);
    setRooms(1);
  };

  const handleReserva = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setErrorReserva(null);

    if (!startDate || !endDate) {
      setErrorReserva("Por favor selecciona las fechas de tu estadía");
      return;
    }

    if (endDate < startDate) {
      setErrorReserva("La fecha de salida debe ser posterior a la de entrada");
      return;
    }
    try {
      const reservaData = {
        huespedReservador: user.id,
        cantHuespedes: guests,
        alojamiento: alojamientoId,
        rangoDeFechas: {
          fechaInicio: startDate.toISOString(),
          fechaFin: endDate.toISOString(),
        },
      };

      const response = await axios.post(
        "http://localhost:3000/reservas",
        reservaData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        router.push(`/confirmacion/${response.data._id}`);
      }
    } catch (errorReserva) {

      let errorMessage = "Error al realizar la reserva";
      if (errorReserva.response) {
        if (errorReserva.response.status === 400) {
          errorMessage =
            errorReserva.response.data.message || "Datos inválidos";
        } else if (error.response.status === 409) {
          errorMessage =
            "El alojamiento no está disponible para las fechas seleccionadas";
        } else if (errorReserva.response.status === 404) {
          errorMessage = "Alojamiento no encontrado";
        }
      }
    }
  };

  const obtenerIcono = (caracteristica) => {
    const iconos = {
      WIFI: <FaWifi className="icono-caracteristica" />,
      PISCINA: <FaSwimmingPool className="icono-caracteristica" />,
      ESTACIONAMIENTO: <FaParking className="icono-caracteristica" />,
      "AIRE ACONDICIONADO": <FaSnowflake className="icono-caracteristica" />,
      COCINA: <FaUtensils className="icono-caracteristica" />,
      TV: <FaTv className="icono-caracteristica" />,
      "MASCOTAS PERMITIDAS": <FaPaw className="icono-caracteristica" />,
    };

    return (
      iconos[caracteristica.toUpperCase()] || (
        <FaCheck className="icono-caracteristica" />
      )
    );
  };

  return (
    <>
      <div className="datos-bg">
        <h2 className="nombre-hotel"> {alojamiento.nombre}</h2>
        <div className="contenedor-principal">
          <div className="seccion-izquierda">
            <div className="galeria-fotos">
              <Image
                src={alojamiento.fotos[0]?.path}
                alt={alojamiento.fotos[0]?.descripcion}
                width={505}
                height={286}
                objectFit="cover"
                className="foto-principal"
              />
              <div className="fotos-secundarias">
                {alojamiento.fotos.slice(1, 5).map((foto, index) => (
                  <Image
                    key={index}
                    src={foto.path}
                    alt={`${alojamiento.nombre} - ${foto.descripcion}`}
                    width={120}
                    height={80}
                    objectFit="cover"
                  />
                ))}
              </div>
            </div>

            <div className="detalles">
              <h2 className="titulo-seccion">Beneficios y características</h2>
              <div className="caracteristicas-container">
                <h3 className="subtitulo">Características</h3>
                <div className="lista-caracteristicas">
                  {alojamiento.caracteristicas.map((caract, index) => (
                    <div key={index} className="caracteristica-item">
                      {obtenerIcono(caract)}
                      <span>{caract}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="horarios-container">
                <h3 className="subtitulo">Horarios de atención</h3>
                <div className="horario-item">
                  <FaClock className="icono-horario" />
                  <span>Check-in: {alojamiento.horarioCheckIn}</span>
                </div>
                <div className="horario-item">
                  <FaClock className="icono-horario" />
                  <span>Check-out: {alojamiento.horarioCheckOut}</span>
                </div>
              </div>
            </div>
            <div className="datos-alojamiento">
              <div className="descripcion">
                <h2>Descripción</h2>
                <p>{alojamiento.descripcion}</p>
              </div>
              <div className="ubicacion">
                <h2>Ubicación</h2>
                <p>Pais: {alojamiento.direccion.ubicacion.pais}</p>
                <p>Ciudad: {alojamiento.direccion.ubicacion.ciudad}</p>
              </div>
            </div>
          </div>
          <div className="seccion-derecha">
            <div className="reserva-box">
              <h3>Elegir habitación</h3>
              <div className="datos-reserva">
                <div className="a-rellenar">
                  <FaCalendarAlt className="icon" />
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    minDate={today}
                    onChange={(update) => setDateRange(update)}
                    placeholderText="Desde-Hasta"
                    className="search-input"
                    dateFormat="dd/MM/yyyy"
                    wrapperClassName="datepicker-wrapper"
                  />
                </div>
                <div className="selector-container" ref={dropdownRef}>
                  <div
                    className="a-rellenar"
                    onClick={() => setShowGuests(!showGuests)}
                  >
                    <FaUserFriends className="icon" />
                    <div className="text-group">
                      <small>Personas/habitaciones</small>
                      <strong>
                        {guests} huésped(es), {rooms} habitación(es)
                      </strong>
                    </div>
                  </div>

                  {showGuests && (
                    <div className="dropdown">
                      <div className="dropdown-row">
                        <span>Huéspedes</span>
                        <div>
                          <button
                            onClick={(e) => {
                              setGuests(Math.max(1, guests - 1));
                            }}
                          >
                            -
                          </button>
                          <span>{guests}</span>
                          <button
                            onClick={(e) => {
                              setGuests(guests + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="dropdown-row">
                        <span>Habitaciones</span>
                        <div>
                          <button
                            onClick={(e) => {
                              setRooms(Math.max(1, rooms - 1));
                            }}
                          >
                            -
                          </button>
                          <span>{rooms}</span>
                          <button
                            onClick={(e) => {
                              setRooms(rooms + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  className="button-reserva"
                  variant="contained"
                  onClick={handleReserva}
                >
                  Reserva
                </Button>
                {errorReserva && <Alert severity="error">{errorReserva}</Alert>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlojamientoDetalle;