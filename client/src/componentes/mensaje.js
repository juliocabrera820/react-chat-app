import React from "react";

const Mensaje = ({ usuario, texto }) => (
  <div className="alert alert-primary">
    <h5>
      {usuario.toUpperCase()}: <span>{texto} </span>
    </h5>
  </div>
);

export default Mensaje;
