import  {UsuarioRepository } from "../models/repositories/usuarioRepository.js"
import { UsuarioService } from "./usuarioService.js";

export default async function handlerRegister(req, res) {

    const usuarioRepo = new UsuarioRepository();
    const usuarioServ = new UsuarioService(usuarioRepo)
    const usuario = req.body

    const user = await usuarioServ.create(usuario)

    res.status(200).json({
        user: user.id
    })
}