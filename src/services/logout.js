export default async function handlerLogout(req, res) {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Sesión cerrada exitosamente",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al cerrar sesión",
    });
  }
}
