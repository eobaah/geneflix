const express = require('express');
const config = require( './src/config' ).getConfig();
const bodyParser = require( 'body-parser' );
const session = require( 'express-session' );
const middlewares = require( './src/middlewares' );
const methodOverride = require( 'method-override' );
const cookieParser = require('cookie-parser');
const morgan = require( 'morgan' );
const routes = require( './src/routes');
const app = express();

app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( morgan('dev') );

app.use( cookieParser())
app.use( methodOverride( '_method' ))
app.use( middlewares.setDefaultResponseLocals )

app.use( session( {
  key: process.env.KEY,
  store: new ( require ( 'connect-pg-simple' )( session ) )(),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 60000 }
} ) );

app.set( 'view engine','ejs' );
app.set( 'views',__dirname + '/src/views' );
app.use( express.static('public') )

app.use( '/', routes )

app.listen( config.server.port, ()=> {
  console.log(`Your app is running on port ${config.server.port}!`)
})
