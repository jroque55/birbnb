import { UsuarioController } from "../controllers/usuarioController.js";
import handlerLogin from "../services/login.js";
import handlerRegister from "../services/register.js";
import handlerSession from "../services/session.js";
import handlerLogout from "../services/logout.js";

export function registerUsuarioRoutes(app, getController) {
  app.get("/usuario", (req, res, next) =>
    getController(UsuarioController).findAll(req, res, next)
  );
  app.post("/usuario", (req, res, next) =>
    getController(UsuarioController).create(req, res, next)
  );
  app.delete("/usuario/:id", (req, res, next) =>
    getController(UsuarioController).delete(req, res, next)
  );
  app.post("/auth/login", async (req, res)=> 
    handlerLogin(req,res)
  )
  app.get('/auth/session', async(req, res)=>
    handlerSession(req, res)
  ) 
  app.post('/auth/logout', async (req, res) =>
    handlerLogout(req,res)
  )
  app.post('/auth/register', async (req, res) => 
    handlerRegister(req, res)
  )
    
}
