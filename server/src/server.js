const app = require("express");
const http = require("http").createServer(app);
const socketIO = require("socket.io")(http);

const PORT = 4000;
socketIO.on("connection", (socket) => {
  console.log("new connection");
  console.log(socket.id);
});
http.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
