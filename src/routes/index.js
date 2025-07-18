import { registerAlojamientoRoutes } from './alojamientoRoutes.js';
import { registerReservaRoutes } from './reservaRoutes.js';
import { registerUsuarioRoutes } from './usuarioRoutes.js';
import { registerNotificaciones} from './notificacionRoutes.js'

export function configureRoutes(app, getController) {
    registerAlojamientoRoutes(app, getController);
    registerReservaRoutes(app, getController);
    registerUsuarioRoutes(app,getController)
    registerNotificaciones(app, getController);
    
}