// Establece la dirección del socket donde el cliente se va a conectar
var socket = io.connect('http://192.168.250.1:7000',{'forceNew':true});

// Recibe el mensaje a mostrar
socket.on('messages', function(data){
  console.log(data);
  render(data);
});

// Función para mostrar el mensaje en el HTML
function render(data){
  var html = data.map(function(message, index){
    return (`
      <div class="message">
        <strong>${message.nickname}</strong> dice:
        <p>${message.text}</p>
      </div>
    `);
  }).join(' ');

// Enseña el mensaje en el documento HTML
  var div_msgs = document.getElementById('messages');
  div_msgs.innerHTML = html;
  div_msgs.scrollTop = div_msgs.scrollHeight;
}

// Función para guardar los datos del mensaje
function addMessage(e){
  var message = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value,
  };

  document.getElementById('nickname').style.display = 'none';
  socket.emit('add-message', message);

  return false;
}