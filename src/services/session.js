import jwt from 'jsonwebtoken'
import { UsuarioRepository } from '../models/repositories/usuarioRepository.js';
//import { UsuarioModel } from '../models/schemas/usuarioSchema';

export default async function handlerSession(req, res) {

  const usuarioRepo = new UsuarioRepository()

  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      return res.status(200).json({ user: null });
    }

    const decoded = jwt.verify(token, "tu_clave_secreta");
    
    const user = await usuarioRepo.findById(decoded.id);
    
    if (!user) {
      return res.status(200).json({ user: null });
    }

    res.status(200).json({ 
      user: { 
        id: user._id,
        name: user.nombre,
        email: user.email,
        avatar: user.avatar,
        tipo: user.tipo 
      } 
    });
  } catch (err) {
    res.status(200).json({ user: null });
  }
}