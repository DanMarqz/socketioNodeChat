// CARGA DE MODULOS

// Importamos express
const express = require('express');
// Llamar express
var app = express();
// Servidor HTTP
const server = require('http').Server(app);
// Importa express y llama al server para los sockets
const io = require('socket.io')(server);

// Usa un middleware de Express para tener una vista estática
app.use(express.static('client'));

// Crea una ruta en el servidor con express
app.get('/', function(req, res){
  res.status(200).send('Estamos en el puerto 7000.')
});

// Mensaje por defecto en variable por no haber base de datos.
var messages = [{
  id: 1,
  text: 'Dime que eres mi puta al oído.',
  nickname: 'Big Daddy'
}];

// Abre conexión al socket (Va a recibir la conexión del cliente)
io.on('connection', function(socket){
  console.log("Alguien se ha conectado al socket bajo el nodo: " + socket.handshake.address);

  socket.emit('messages', messages);

  socket.on('add-message', function(data){
    messages.push(data);
    io.sockets.emit('messages',messages);
  });


})

// Coloca el servidor a escuchar
server.listen(7000, function(){
  console.log('El servidor está corriendo en el puerto 7000 (http://localhost:7000)');
});