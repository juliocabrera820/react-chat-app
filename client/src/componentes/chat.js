import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

const Chat = () => {
  useEffect(() => {}, []);
  const [mensaje, setMensaje] = useState({ usuario: "", text: "" });
  const [mensajes, setMensajes] = useState([]);
  return (
    <div>
      <h2 className="text-center">Room chat</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar nombre"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa mensaje"
          />
        </div>
        <button className="btn btn-info btn-block">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
