const express = require('express')
const app = express()
const config = require( './src/config' ).getConfig()
const bodyParser = require( 'body-parser' );
const session = require( 'express-session' );
const morgan = require( 'morgan' );
const routes = require( './src/routes')

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.listen( config.server.port, ()=> {
  console.log(`Your app is running on port ${config.server.port}!`)
})
