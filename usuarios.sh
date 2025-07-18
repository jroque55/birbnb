# URL del endpoint

URL="http://localhost:3000/usuario"

crear_usuario() {
    nombre="$1"
    email="$2"
    password="$3"
    tipo="$4"
    curl -s -XPOST "$URL" \
    -H 'Content-Type: application/json' \
    -d "{\"nombre\": \"$nombre\",\"email\":\"$email\",\"password\":\"$password\", \"tipo\":\"$tipo\"}"

    echo
}

#ANFITRIONES
crear_usuario "Juan" "juan@gmail.com" "avestruz123" "ANFITRION"
crear_usuario "Franco" "franco@gmail.com" "tigre123" "ANFITRION"

#HUESPEDES
crear_usuario "Julian"  "julian@gmail.com" "jabali123" "HUESPED"
crear_usuario "German" "german@gmail.com" "contrasena" "HUESPED"
crear_usuario "Manolo" "david@gmail.com" "vacaciones123" "HUESPED"
