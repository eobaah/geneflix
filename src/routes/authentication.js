const express = require ( 'express' )
const router = express.Router()
const member = require( '../models/members')
const passport = require( '../../authentication')
module.exports = passport => {
  router.route( '/login')
  .get( (request, response ) => {
    response.send( 'I am in the login page' )
  })
  .post( passport.authenticate( 'local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true

  }))

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
