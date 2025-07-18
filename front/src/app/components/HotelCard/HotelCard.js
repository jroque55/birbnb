'use client'

import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react';
import Image from 'next/image';
import './HotelCard.css'

const HotelCard = ({
  name,
  location,
  price,
  imageUrl,
  showButton = true,
  id
}) => {
  const router = useRouter();

  // Generar rating y reviews aleatoriamente
  const rating = useMemo(() => (Math.random() * (10 - 7) + 7).toFixed(1), []);
  const reviews = useMemo(() => Math.floor(Math.random() * (1000 - 100) + 100), []);

   return (
    <div className="hotel-card">
      <div className="hotel-image">
        <Image
          src={imageUrl}
          alt={name}
          className="hotel-photo"
          width={200}
          height={200}
          priority
        />
      </div>

      <div className="hotel-content">
        <div className="hotel-header">
          <h2 className="hotel-name">{name}</h2>
          <p className="hotel-location">{location}</p>
        </div>

        <div className="rating-container">
          <div className="rating">
            <span className="rating-value">{rating}</span>
            <span className="rating-text">Muy bueno ({reviews})</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="booking-info">
          <div className="price">
            <span className="price-value">$ {price}</span>
            <span className="price-note"> Incl. Impuestos y cargos</span>
          </div>
          {showButton && (
            <button className="offer-button"
              onClick={() => router.push(`/alojamientos/${id}`)}
            >
              Ver oferta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
