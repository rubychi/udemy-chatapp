let moment = require('moment');

// Jan 1st 1970 00:00:00 am

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));
