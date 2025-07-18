"use client";
import "./alojamientos-hot.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const estilo = {
  borderRadius: "8px 8px 0px 0px",
};

const ProductItem = ({ aProduct }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/alojamientos/${aProduct.id}`);
  }, [router, aProduct.id]);

  return (
    <div className="product-carousel-item">
      <Image
        src={aProduct.image}
        width={310.667}
        height={160}
        alt={aProduct.id}
        style={estilo}
        objectFit="cover"
      />
      <h2 onClick={handleClick} style={{ cursor: "pointer" }}>
        {aProduct.title}
      </h2>{" "}
      <p>Precio por noche: ${aProduct.price}</p>
      <p>Huespedes máx: {aProduct.huespedesMax}</p>
      <p>Reputacion: {aProduct.reputation}</p>
      <p>Ubicacion: {aProduct.ubication}</p>
      <p>Dirección: {aProduct.direction}</p>
    </div>
  );
};

export default ProductItem;
