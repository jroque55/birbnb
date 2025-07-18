'use client'

import Header from './components/header/Header';
import BarraInferior from './components/barra_inferior/BarraInferior';
import UserSession from './UserSession';
import "./Global.css"

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body>
        <UserSession>
          <Header />
          <main className="general">{children}</main>
        </UserSession>
        <BarraInferior className="footer "></BarraInferior>
      </body>
    </html>
  );
}
