"use client";
import { FaSearch, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "./Datos.css";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authContext } from "../AuthContext";

const estilo = {
  border: "1px solid rgb(243, 242, 242)",
};

const Redireccionamiento = (Img0, Img1, Img2, Img3, Img4) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const router = useRouter();
  const { user } = useContext(authContext);

  const handleReserva = () => {
    if (user) {
      router.push("/reserva/confirmacion");
    } else {
      router.push("/auth/login");
    }
  };

  const today = new Date();
  const [startDate, endDate] = dateRange;
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const clearFilters = () => {
    setDateRange([null, null]);
    setGuests(2);
    setRooms(1);
  };

  return (
    <div className="datos-bg">
      <h2 className="nombre-hotel">Nombre del hotel</h2>
      <div className="grande">
        <div className="hola">
          <Image
            src={Img0}
            width={505}
            height={286}
            alt="hola"
            style={estilo}
            objectFit="cover"
          />
        </div>
        <div className="hola">
          <Image
            src={Img1}
            width={252.5}
            height={143}
            alt="hola"
            style={estilo}
            objectFit="cover"
          />
          <Image
            src={Img2}
            width={252.5}
            height={143}
            alt="hola"
            style={estilo}
            objectFit="cover"
          />
        </div>
        <div className="hola">
          <Image
            src={Img3}
            width={252.5}
            height={143}
            alt="hola"
            style={estilo}
            objectFit="cover"
          />
          <Image
            src={Img4}
            width={252.5}
            height={143}
            alt="hola"
            style={estilo}
            objectFit="cover"
          />
        </div>
        <div className="detalles">
          <h2 className="caracs">Beneficios y características</h2>
          <div className="beneficios">
            <div className="columna">
              <div>🍔Restaurante</div>
              <div>🐕‍🦺Acepta mascotas</div>
              <div>⛽Punto de carga de vehículos eléctricos</div>
              <div>🛜WI-FI</div>
            </div>
            <div className="columna">
              <div>🏊🏻Piscina</div>
              <div>🍸Bar</div>
              <div>Desayuno (08:00am - 11:00am)</div>
              <div>Merienda (15:00pm - 19:00pm)</div>
            </div>
          </div>
        </div>
      </div>
      <div className="reserva">
        <div>Elegir habitación</div>
        <div className="datos-reserva">
          <button className="a-rellenar">
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
            />
          </button>
          <button
            className="a-rellenar"
            onClick={() => {
              setShowGuests(!showGuests);
              setShowPrice(false);
            }}
          >
            <FaUserFriends className="icon" />
            <div className="text-group">
              <small>Personas/habitaciones</small>
              <strong>
                {guests} huésped(es), {rooms} habitación(es)
              </strong>
            </div>
            {showGuests && (
              <div className="dropdown">
                <div className="dropdown-row">
                  <span>Huéspedes</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuests(Math.max(1, guests - 1));
                    }}
                  >
                    -
                  </button>
                  <span>{guests}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuests(guests + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="dropdown-row">
                  <span>Habitaciones</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRooms(Math.max(1, rooms - 1));
                    }}
                  >
                    -
                  </button>
                  <span>{rooms}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRooms(rooms + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </button>
          <div className="reserva-button-container">
            <Button
              className="button-reserva"
              variant="contained"
              onClick={handleReserva}
            >
              Reserva
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redireccionamiento;
