import { UsuarioRepository } from "../models/repositories/usuarioRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handlerLogin(req, res) {
  const usuarioRepo = new UsuarioRepository();
  const { email, password } = req.body;

  try {
    const user = await usuarioRepo.findByEmail(email);
    const contrasenaValida = await bcrypt.compare(password, user.password);
    console.log(user)
    if (!contrasenaValida) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }
    const token = jwt.sign(
      { id: user._id, nombre: user.nombre },
      process.env.PRIVATE_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json({ 
    success: true,
    user: {
      id: user._id,
      name: user.nombre,
      email: user.email
    }
  });

  } catch (err) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  //   res.status(200).json({
  //     success: true,
  //     user: { nombre: user.nombre },
  //   });
}
