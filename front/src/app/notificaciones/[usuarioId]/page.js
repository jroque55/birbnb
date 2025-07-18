"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import "./Notificaciones.css";
import axios from "axios";
import Loading from "@/app/components/loading/loading";
import NotificacionCard from "@/app/components/NotificacionCard/NotificacionCard";
import NoEncontrado from "@/app/components/not_found/ContenidoNoEncontrado";
import { Button, ButtonGroup } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Pagination from "@/app/components/paginacion/paginacion";

export default function NotificacionesPage() {
  const router = useRouter()
  const pathname = usePathname();
  const [notificaciones, setNotificaciones] = useState([]);
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("todas");
  const { usuarioId } = useParams();
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDocuments: 0,
    NextPage: false,
    PrevPage: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 7;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (notificacionId) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n._id === notificacionId ? { ...n, leida: true } : n))
    );
  };

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        setError(null);
        const params = {
          page: currentPage,
          limit: limit,
        };
        const response = await axios.get(
          `http://localhost:3000/notificaciones/${usuarioId}`,
          { params }
        );
        setNotificaciones(response.data.data || []);
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
        setError("Error al cargar notificaciones");
        setNotificaciones([])
      }
    };
    fetchNotificaciones();
  }, [usuarioId, currentPage, limit]);

  const filteredNotificaciones = notificaciones.filter((notif) => {
    if (filter === "leidas") return notif.leida;
    if (filter === "no-leidas") return !notif.leida;
    return true;
  });

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
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="notificaciones-container">
      <div className="notificaciones-header">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon></MoreVertIcon>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setFilter("todas");
            }}
            color={filter === "todas" ? "primary" : "inherit"}
          >
            Todas
          </MenuItem>
          <MenuItem
            onClick={() => {
              setFilter("no-leidas");
            }}
            color={filter === "no-leidas" ? "primary" : "inherit"}
          >
            No leídas
          </MenuItem>
          <MenuItem
            onClick={() => {
              setFilter("leidas");
            }}
            color={filter === "leidas" ? "primary" : "inherit"}
          >
            Leídas
          </MenuItem>
        </Menu>
      </div>

      {filteredNotificaciones.length === 0 ? (
        <NoEncontrado
          elemento={`notificaciones ${filter === "todas" ? "" : filter}`}
          acciones={
            <div className="empty-actions">
              {filter !== "todas" && (
                <Button variant="outlined" onClick={() => setFilter("todas")}>
                  Ver todas las notificaciones
                </Button>
              )}
            </div>
          }
        />
      ) : (
        <div className="notificaciones-list"> 
          {filteredNotificaciones.map((notificacion, index) => (
            <NotificacionCard
              key={`${notificacion._id}-${pagination.currentPage}-${index}`}
              notificacion={notificacion}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalDocuments={filteredNotificaciones.length}
          />
        </div>
      )}
    </div>
  );
}
