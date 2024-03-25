import React, { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import "./App.css";

const App: React.FC = () => {
  //https://es.react.dev/reference/react/useRef
  const fechaBase = useRef(DateTime.utc()); // Estado inicial con la fecha actual en la zona horaria local

  useEffect(() => {
    const interval = setInterval(() => {
      // No es posible cambiar el estado 'fechaBase' directamente debido a la restricción
      // Se podría usar un estado separado para controlar la renderización
      // window.location.reload();
      fechaBase.current = DateTime.utc();
      forceUpdate();
    }, 1000); // Actualizar cada segundo para mantener la hora actualizada

    return () => clearInterval(interval);
  }, []);

  const [, updateState] = useState<any>();
  const forceUpdate = () => updateState({});

  const obtenerHoraCiudad = (ciudades: string, zonaHoraria: string) => {
    return fechaBase.current
      .setZone(zonaHoraria)
      .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
  };

  return (
    <div>
      <h1>Hora en distintas ciudades</h1>

      <div className="card">
        <h2>Los Angeles</h2>
        <p>{obtenerHoraCiudad("Los Angeles", "America/Los_Angeles")}</p>
      </div>

      <div className="card">
        <h2>Nueva York</h2>
        <p>{obtenerHoraCiudad("Nueva York", "America/New_York")}</p>
      </div>

      <div className="card">
        <h2>Madrid</h2>
        <p>{obtenerHoraCiudad("Madrid", "Europe/Madrid")}</p>
      </div>

      <div className="card">
        <h2>Moscú</h2>
        <p>{obtenerHoraCiudad("Moscú", "Europe/Moscow")}</p>
      </div>

      <div className="card">
        <h2>Tokio</h2>
        <p>{obtenerHoraCiudad("Tokio", "Asia/Tokyo")}</p>
      </div>

      <div className="card">
        <h2>Buenos Aires</h2>
        <p>
          {obtenerHoraCiudad("Buenos Aires", "America/Argentina/Buenos_Aires")}
        </p>
      </div>
    </div>
  );
};

export default App;
