"use client"

import './Navbar.css';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaList } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [showPrice, setShowPrice] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFeatures, setShowFeatures] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const today = new Date()
  const guestsRef = useRef(null);
  const priceRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGuests && guestsRef.current && !guestsRef.current.contains(event.target)) {
        setShowGuests(false);
      }
      if (showPrice && priceRef.current && !priceRef.current.contains(event.target)) {
        setShowPrice(false);
      }
      if (showFeatures && featuresRef.current && !featuresRef.current.contains(event.target)) {
        setShowFeatures(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGuests, showPrice, showFeatures]);

  const featuresList = ["WIFI", "PISCINA", "ESTACIONAMIENTO", "MASCOTAS_PERMITIDAS"];

  const buildSearchParams = () => {
    const params = new URLSearchParams();
    
    if (location.trim()) {
      params.append('ubication', location.trim());
    }

    if (startDate && endDate) {
    params.append('fechaInicio', startDate.toISOString().split('T')[0]);
    params.append('fechaFin', endDate.toISOString().split('T')[0]);
    }
    
    if (guests > 0) {
      params.append('personLimit', guests.toString());
    }
    
    if (minPrice && minPrice > 0) {
      params.append('precioGt', minPrice);
    }
    if (maxPrice && maxPrice > 0) {
      params.append('precioLt', maxPrice);
    }

    if (selectedFeatures.length > 0) {
    params.append('caracteristica', selectedFeatures.join(','));
    }
    
    params.append('page', '1');
    params.append('limit', '6');
    return params.toString();
  };

  const handleSearch = () => {
    const queryString = buildSearchParams();
    router.push(`/alojamientos?${queryString}`);
  };

  const clearFilters = () => {
    setLocation('');
    setDateRange([null, null]);
    setGuests(2);
    setRooms(1);
    setMinPrice('');
    setMaxPrice('');
    setSelectedFeatures([]);
    setShowGuests(false);
    setShowPrice(false);
    setShowFeatures(false);
  };

  return (
    <div className="navbar-bg">
      <div className="search-bar">
        <div className="search-section">
          <FaSearch className="icon" />
          <div className="text-group">
            <small>Lugar de interés</small>
            <input
              type="text"
              placeholder="¿Dónde querés ir?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        <div className="search-section">
          <FaCalendarAlt className="icon" />
          <div className="text-group">
            <small>Fechas</small>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              minDate={today}
              onChange={(update) => setDateRange(update)}
              placeholderText="-- / -- / --"
              className="search-input"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <div className="search-section" onClick={() => {
          setShowGuests(!showGuests);
          setShowPrice(false);
          setShowFeatures(false);
        }}>
          <FaUserFriends className="icon" />
          <div className="text-group">
            <small>Cantidad de personas</small>
            <strong>{guests} huésped(es)</strong>
          </div>
          {showGuests && (
            <div className="dropdown" ref={guestsRef} onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-row">
                <span>Huéspedes</span>
                <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                <span>{guests}</span>
                <button onClick={() => setGuests(guests + 1)}>+</button>
              </div>
            </div>
          )}
        </div>

        <div className="search-section" onClick={() => {
          setShowPrice(!showPrice);
          setShowGuests(false);
          setShowFeatures(false);
        }}>
          <FaUserFriends className="icon" />
          <div className="text-group">
            <small>Precio por noche</small>
            <strong>
              {minPrice && maxPrice 
                ? `$${minPrice} - $${maxPrice}` 
                : minPrice 
                  ? `Desde $${minPrice}`
                  : maxPrice 
                    ? `Hasta $${maxPrice}`
                    : 'Precio por noche'
              }
            </strong>
          </div>
          {showPrice && (
            <div className="dropdown" ref={priceRef} onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Precio mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
              />
              <input
                type="text"
                placeholder="Precio máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
              />
            </div>
          )}
        </div>

        <div className="search-section" onClick={() => {
          setShowFeatures(!showFeatures);
          setShowGuests(false);
          setShowPrice(false);
        }}>
          <FaList className="icon" />
          <div className="text-group">
            <small>Características</small>
            <strong>
              {selectedFeatures.length > 0 ? selectedFeatures.join(', ') : "Seleccionar"}
            </strong>
          </div>
          {showFeatures && (
            <div className="dropdown" ref={featuresRef} onClick={(e) => e.stopPropagation()}>
              {featuresList.map((feature, idx) => (
                <label key={idx} className="feature-option">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => {
                      if (selectedFeatures.includes(feature)) {
                        setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                      } else {
                        setSelectedFeatures([...selectedFeatures, feature]);
                      }
                    }}
                  />
                  {feature}
                </label>
              ))}
            </div>
          )}
        </div>

        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
        
        <button 
          className="clear-button" 
          onClick={clearFilters}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default Navbar;