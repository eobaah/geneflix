const express = require ( 'express' )
const router = express.Router()
const member = require( '../models/members')
const authPassport = require( '../../authentication')

module.exports = authPassport => {
  router.get( '/login', (request, response ) => {
    response.send( 'I am in the login page' )
  })

  router.post( '/login', authPassport.authenticate( 'local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'
  }), (request, response ) => {
    response.send( `${request.user.username} is logged authenticated`)
  })

  router.route( '/signup')
  .get( (request, response ) => {
    response.send( 'I am in the signup page' )
  })
  .post( ( request, response ) => {
    const {
      username,
      email,
      password } = request.body
      member.create( username, email, password )
        .then( ()=> {
          response.send( 'Created a member')
        })
  })

  router.use( ( request, response, next ) => {
    console.log( 'request.session::', request.session)
    if( request.member ) {
      next()
    } else {
      response.redirect('/login')
    }
  })
  return router
}
