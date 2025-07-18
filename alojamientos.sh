#!/bin/bash

URL="http://localhost:3000/alojamientos"

crear_alojamiento() {
    idAnfitrion="$1"
    nombre="$2"
    descripcion="$3"
    precioPorNoche="$4"
    moneda="$5"
    checkIn="$6"
    checkOut="$7"
    calle="$8"
    altura="$9"
    ciudad="${10}"
    pais="${11}"
    latitud="${12}"
    longitud="${13}"
    cantMax="${14}"
    caracteristicas="${15}"
    fotos="${16}"

    curl -s -X POST "$URL" \
        -H 'Content-Type: application/json' \
        -d "{
            \"idAnfitrion\": \"$idAnfitrion\",
            \"nombre\": \"$nombre\",
            \"descripcion\": \"$descripcion\",
            \"precioPorNoche\": $precioPorNoche,
            \"moneda\": \"$moneda\",
            \"horarioCheckIn\": \"$checkIn\",
            \"horarioCheckOut\": \"$checkOut\",
            \"direccion\": {
                \"calle\": \"$calle\",
                \"altura\": $altura,
                \"ubicacion\": {
                    \"ciudad\": \"$ciudad\",
                    \"pais\": \"$pais\"
                },
                \"latitud\": $latitud,
                \"longitud\": $longitud
            },
            \"cantHuespedesMax\": $cantMax,
            \"caracteristicas\": $caracteristicas,
            \"fotos\": $fotos
        }"
    echo
}

#cargar segun los id que genere usuarios.sh
anfitrion1="6853dce16c0c06fc2e0176fb"
anfitrion2="6853dce16c0c06fc2e0176fe"

#https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_534,q_40,w_800/hotelier-images/81/24/68bb7de2d5d7334fa7efecf296aa70ce37b16eb01f0ca86f79f23dc616e4.jpeg
#https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_534,q_40,w_800/hotelier-images/6d/58/1d239a800ae3f1acac88da76d84c47d7369e0c28b4b6ef464aad2164fc85.jpeg

# https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/76b86fa2-dbd2-45c5-a079-d70be5f41494.jpeg?im_w=960
# https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/37e1ef7b-fc98-425e-9cb8-e19f558b4c33.jpeg?im_w=720
# https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/2ac51b16-d587-4ca3-a876-4f9fcce8782e.jpeg?im_w=720
# https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/90a6d317-b623-44d0-a31c-c7e0d8de519f.jpeg?im_w=720

foto1='[
    {
        "path": "https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/76b86fa2-dbd2-45c5-a079-d70be5f41494.jpeg?im_w=960",
        "descripcion": "Vista frontal de la cabaña con entrada principal"
    },
    {
        "path": "https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/37e1ef7b-fc98-425e-9cb8-e19f558b4c33.jpeg?im_w=720",
        "descripcion": "Sala de estar con chimenea y sofá"
    },
    {
        "path": "https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/2ac51b16-d587-4ca3-a876-4f9fcce8782e.jpeg?im_w=720",
        "descripcion": "Dormitorio principal con cama king size"
    },
    {
        "path": "https://a0.muscache.com/im/pictures/hosting/Hosting-1358946873152058127/original/90a6d317-b623-44d0-a31c-c7e0d8de519f.jpeg?im_w=720",
        "descripcion": "Baño moderno con ducha de lluvia"
    }
]'

# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/67/26/9fb4ead90d639c2d0bf4df7af684d528867bc6fa0c0d2b8dfedb8bc405f9.jpeg
# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/be/64/2f7f10eab142419f4dacae6bc57d05044ba0d5c3f3b51c8fc176f518467a.jpeg
# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/87/1e/304c03d7dc2724f30d4540a9913980f832690b8dbea0f5fc7792bd781fa9.jpeg
# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/94/25/325e04d1f793bd418594e98f58f5cadf690ceb2b43729ad34247a912b079.jpeg

foto2='[
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/67/26/9fb4ead90d639c2d0bf4df7af684d528867bc6fa0c0d2b8dfedb8bc405f9.jpeg",
        "descripcion": "Fachada del loft moderno en la ciudad"
    },
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/be/64/2f7f10eab142419f4dacae6bc57d05044ba0d5c3f3b51c8fc176f518467a.jpeg",
        "descripcion": "Cocina totalmente equipada"
    },
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/87/1e/304c03d7dc2724f30d4540a9913980f832690b8dbea0f5fc7792bd781fa9.jpeg",
        "descripcion": "Área de trabajo con escritorio"
    },
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/94/25/325e04d1f793bd418594e98f58f5cadf690ceb2b43729ad34247a912b079.jpeg",
        "descripcion": "Terraza con vista panorámica"
    }
]'

# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/c9/89/ce298513bf900202c6aa3de04188bfecc1de934b852bc68ddceb24b436ca.jpeg
# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/a3/ad/0b13dc20a67e1a28f1e3bf076b77b8a8c3b9f3ecc99ef98637eb18c63b53.jpeg
# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/ce/d7/a1818f599ce7542676e3f55d57c5d9c0981a772a4b297db034544d219445.jpeg
# https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/ce/d7/a1818f599ce7542676e3f55d57c5d9c0981a772a4b297db034544d219445.jpeg
foto3='[
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/c9/89/ce298513bf900202c6aa3de04188bfecc1de934b852bc68ddceb24b436ca.jpeg",
        "descripcion": "Piscina exterior con área de descanso"
    },
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/a3/ad/0b13dc20a67e1a28f1e3bf076b77b8a8c3b9f3ecc99ef98637eb18c63b53.jpeg",
        "descripcion": "Restaurante del hotel con decoración elegante"
    },
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/ce/d7/a1818f599ce7542676e3f55d57c5d9c0981a772a4b297db034544d219445.jpeg",
        "descripcion": "Suite ejecutiva con sala de estar"
    },
    {
        "path": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/ce/d7/a1818f599ce7542676e3f55d57c5d9c0981a772a4b297db034544d219445.jpeg",
        "descripcion": "Vista desde la habitación al amanecer"
    }
]'

crear_alojamiento "$anfitrion1" "Cabaña del bosque" "Cabaña acogedora en el bosque" 1500 "PESO_ARG" "14:00" "10:00" "Ruta 40" 300 "CABA" "ARG" -41.1335 -71.3103 4 "[\"WIFI\", \"PISCINA\"]" "$foto1"
crear_alojamiento "$anfitrion2" "Loft moderno" "Loft céntrico ideal para parejas" 80 "DOLAR_USA" "15:00" "11:00" "Av. Corrientes" 1234 "CABA" "ARG" -34.6037 -58.3816 2 "[\"WIFI\"]" "$foto2"
crear_alojamiento "$anfitrion2" "Hotel Lalala" "Laguna cerca de casa" 500 "DOLAR_USA" "08:00" "20:00" "Ruta 9" 200 "Cordoba" "ARG" -35.55 -89.44 5 "[\"WIFI\", \"ESTACIONAMIENTO\"]" "$foto3"
crear_alojamiento "$anfitrion1" "Florecia" "Flores alrededor" 300 "REALES" "06:00" "18:00" "Ruta 10" 100 "Cordoba" "ARG" -77.11 -98.13 4 "[\"WIFI\"]" "$foto1"
crear_alojamiento "$anfitrion1" "Hotel Rivoli" "Flores alrededor" 300 "REALES" "06:00" "18:00" "Ruta 10" 100 "Cordoba" "ARG" -77.11 -98.13 3 "[\"ESTACIONAMIENTO\"]" "$foto2"
crear_alojamiento "$anfitrion2" "Hotel Sheraton" "Flores alrededor" 300 "REALES" "06:00" "18:00" "Ruta 10" 100 "Cordoba" "ARG" -77.11 -98.13 1 "[\"MASCOTAS_PERMITIDAS\"]" "$foto3"
crear_alojamiento "$anfitrion1" "Cabañas del Lago" "Vista al lago y montañas" 150 "DOLAR_USA" "08:00" "20:00" "Camino de los Pioneros" 45 "Bariloche" "ARG" -41.13 -71.30 5 "[\"MASCOTAS_PERMITIDAS\", \"WIFI\"]" "$foto1"
crear_alojamiento "$anfitrion2" "Hostel Backpacker" "Ambiente juvenil y festivo" 25 "DOLAR_USA" "07:00" "23:00" "Calle Principal" 12 "Buenos Aires" "ARG" -34.60 -58.38 3 "[\"WIFI\", \"ESTACIONAMIENTO\"]" "$foto2"
crear_alojamiento "$anfitrion1" "Posada San Miguel" "Estilo colonial con piscina" 80 "REALES" "09:00" "22:00" "Avenida del Sol" 30 "Salvador" "BRA" -12.97 -38.51 1 "[\"PISCINA\", \"MASCOTAS_PERMITIDAS\"]" "$foto3"
crear_alojamiento "$anfitrion2" "Apartamento Vista al Mar" "Moderno con vista al océano" 120 "DOLAR_USA" "10:00" "16:00" "Costanera Norte" 50 "Montevideo" "URU" -34.90 -56.16 1 "[\"WIFI\", \"ESTACIONAMIENTO\"]" "$foto1"
crear_alojamiento "$anfitrion1" "Eco Lodge Selva Verde" "Cabañas sostenibles en la jungla" 90 "DOLAR_USA" "07:00" "21:00" "Sendero Ecológico" 8 "Puerto Iguazú" "ARG" -25.60 -54.57 1 "[\"MASCOTAS_PERMITIDAS\", \"ESTACIONAMIENTO\"]" "$foto3"
crear_alojamiento "$anfitrion1" "Loft Moderno Centro" "Diseño minimalista en zona céntrica" 65 "REALES" "14:00" "11:00" "Rua das Flores" 22 "Florianópolis" "BRA" -27.59 -48.55 2 "[\"WIFI\", \"ESTACIONAMENTO\"]" "$foto2"
crear_alojamiento "$anfitrion1" "Hostal Montaña Mágica" "Refugio acogedor cerca de senderos" 40 "DOLAR_USA" "08:00" "19:00" "Camino de los Andes" 15 "Mendoza" "ARG" -32.88 -68.85 4 "[\"WIFI\", \"PISCINA\"]" "$foto1"