const express = require('express')
const app = express()
const config = require( './src/config' ).getConfig()
const port = process.env.PORT

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.listen( port, ()=> {
  console.log(`Your app is running on port ${port}!`)
})
