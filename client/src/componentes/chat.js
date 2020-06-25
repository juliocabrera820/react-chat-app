import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
const socket = io.connect("http://localhost:4000");

const Chat = () => {
  const [mensajes, setMensajes] = useState([]);
  useEffect(() => {
    socket.on("recibir:mensaje", ({ usuario, texto }) => {
      setMensajes([...mensajes, { usuario, texto }]);
    });
  }, [mensajes]);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, event) => {
    enviarMensaje(data);
    event.target.reset();
  };
  const enviarMensaje = (mensaje) => {
    socket.emit("mensaje", mensaje);
  };
  const recibirMensaje = () =>
    mensajes.map(({ usuario, texto }, index) => (
      <div key={index} className="alert alert-primary">
        <h3 className="info">
          {usuario}: <span>{texto} </span>
        </h3>
      </div>
    ));
  const ESPACIOS_BLANCO = "No se permiten espacios en blanco";
  return (
    <div>
      <h2 className="text-center">Room chat</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            ref={register({
              required: "Debes ingresar un usuario",
              validate: (usuario) => usuario.trim() !== "" || ESPACIOS_BLANCO,
            })}
            type="text"
            className={`form-control ${
              errors.usuario ? "is-invalid" : "is-valid"
            }`}
            placeholder="Ingresar nombre"
            name="usuario"
          />
          <div className="valid-feedback">Correcto</div>
          <div className="invalid-feedback">
            {errors.usuario && errors.usuario.message}
          </div>
        </div>
        <div className="form-group">
          <input
            ref={register({
              required: "Debes ingresar un mensaje",
              validate: (texto) => texto.trim() !== "" || ESPACIOS_BLANCO,
            })}
            type="text"
            className={`form-control ${
              errors.texto ? "is-invalid" : "is-valid"
            }`}
            placeholder="Ingresa mensaje"
            name="texto"
          />
          <div className="valid-feedback">Correcto</div>
          <div className="invalid-feedback">
            {errors.texto && errors.texto.message}
          </div>
        </div>
        <button className="btn btn-info btn-block">Enviar</button>
      </form>
      <div className="my-4"> {recibirMensaje()}</div>
    </div>
  );
};

export default Chat;
