let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'client@example.com',
  //   text: 'Hi, this is a test message created by client',
  // });

  socket.on('newMessage', function (message) {
    console.log('You got a message', message);
  });
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
