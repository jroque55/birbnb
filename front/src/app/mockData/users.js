export const users = [
    {id: 1, usuario: "juan123", constrasena: "contrasena", email: "juan@gmail.com" ,rol: "ANFITRION"},
    {id: 2, usuario: "diego123", constrasena: "avestruz123", email: "diego@gmail.com", rol: "HUESPED"},
    {id: 3, usuario: "javier123", constrasena: "gaviota123", email: "javier@gmail.com", rol: "HUESPED"},
    {id: 4, usuario: "rodrigo123", constrasena: "simbague333", email:"rodrigo@gmail.com", rol: "ANFITRION"}
]

export const verificarUsuario = (email, contrasena) => {
  return users.find( user => user.email === email && user.constrasena === contrasena)
}