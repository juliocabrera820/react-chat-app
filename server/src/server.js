const app = require("express");
const http = require("http").createServer(app);
const socketIO = require("socket.io")(http);

const PORT = 4000;
socketIO.on("connection", (socket) => {
  console.log("new connection");
  socket.on("mensaje", ({ usuario, texto }) => {
    socketIO.emit("recibir:mensaje", { usuario, texto });
  });
});
http.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
