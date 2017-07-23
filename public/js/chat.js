var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Height
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  params.tz = moment.tz.guess() || 'Asia/Taipei';

  socket.emit('join', params, function (error) {
    if (error) {
      alert(error);
      window.location.href = '/';
    } else {
      // console.log('No error');
    }
  });
});

socket.on('newMessage', function (message) {
  var params = jQuery.deparam(window.location.search);
  var color, color2;
  if (message.from === 'Admin') {
    color = 'SteelBlue';
    color2 = 'SteelBlue';
  } else if (message.from === params.name) {
    color = 'Crimson';
    color2 = 'SlateGray';
  } else {
    color = 'SlateGray';
    color2 = 'SlateGray';
  }
  var dateObj = new Date(message.createdAt);
  var formattedTime = moment(dateObj).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    color: color,
    color2: color2,
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var params = jQuery.deparam(window.location.search);
  var color = message.from === params.name ? 'Crimson' : 'SlateGray';
  let dateObj = new Date(message.createdAt);
  var formattedTime = moment(dateObj).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    color: color,
    url: message.url,
    from: message.from,
    createdAt: formattedTime,
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('updateUserList', function (users) {
  var params = jQuery.deparam(window.location.search);
  let ol = jQuery('<ul></ul>');

  users.forEach(function (user) {
    var color = user === params.name ? 'Crimson' : 'SlateGray';
    ol.append(jQuery('<li></li>').text(user).css({'color': color}));
  });
  jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextbox.val(),
  }, function () {
    messageTextbox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
