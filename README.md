# ChatApp
[![Build Status](https://travis-ci.org/rubychi/udemy-chatapp.svg?branch=master)](https://travis-ci.org/rubychi/udemy-chatapp)
[![Coverage Status](https://coveralls.io/repos/github/rubychi/udemy-chatapp/badge.svg?branch=master)](https://coveralls.io/github/rubychi/udemy-chatapp?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/rubychi/udemy-chatapp/badge.svg)](https://snyk.io/test/github/rubychi/udemy-chatapp)

A hands-on project from [Udemy: The Complete Node.js Developer Course (2nd Edition)](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4)

## [Live Demo](https://udemy-chatapp.herokuapp.com/)

You can see a complete working example [here](https://udemy-chatapp.herokuapp.com/)

## Features

* Join a specified room to chat

* Send the geographical location to other users in the room if permission is granted

* Automatically scroll down upon receiving a new message

* Responsive web design (RWD)

### Custom Features

* Colorized the user and the administrator's messages to set them apart from the rest

* Save text messages in the cloud so that user won't miss any messages of the day

* Add [nyc (the command-line-client for Istanbul)](https://istanbul.js.org/) for checking the test coverage and generating the test report

## Getting Started

Follow the instructions below to set up the environment and run this project on your local machine

### Prerequisites

* Node.js
* MongoDB

### Installing

1. Download ZIP or clone this repo
```
> git clone https://github.com/rubychi/udemy-chatapp.git
```

2. Start a MongoDB server running on port 27017
```
> mongod
```

3. Install dependencies via NPM
```
> npm install
```

4. Create your own config.json to securely store credentials inside \server\config
```
{
  "test": {
    "PORT": "3000",
    "MONGODB_URI": "mongodb://localhost:27017/ChatAppTest"
  },
  "development": {
    "PORT": "3000",
    "MONGODB_URI": "mongodb://localhost:27017/ChatApp"
  }
}
```

5. Back to the root directory and type the below command to start the server and the service
```
> npm run dev-watch
```

6. See it up and running on http://localhost:3000

## Running the tests

If you just want to run the tests, type in the command below
```
> npm run test-watch
```

For checking the test coverage and generating the html report:
```
> npm run test-report
```

## Deployment

1. Deploy to Heroku
```
> heroku create
> git push heroku master
> heroku addons:create mongolab:sandbox
```

2. Set up config vars
```
> heroku config:set
  MONGODB_URI=[Your MongoDB URI]
```

3. Open the app in the browser
```
> heroku open
```

### Alternatively

Click this button to deploy to your Heroku server<br>

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rubychi/udemy-chatapp)

## Built With

### Frontend

* jquery
* mustache

### Backend

* express
* mongodb
* mongoose
* compression
* helmet

### Utils

* socket.io
* lodash
* moment

### Testing Frameworks
* mocha
* nyc

## Course Notes

* Send an event to everybody in the room 'The Office Fans'
```
io.emit -> io.to('The Office Fans').emit
```
* Send an event to everybody in the room 'The Office Fans' except for the current user
```
socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
```
* Send an event to a specific user
```
socket.emit
```
