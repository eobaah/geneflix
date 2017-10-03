const passport = require( 'passport' )
const Strategy = require( 'passport-local' ).Strategy
const member = require( './src/models/members' )

passport.use( new Strategy(
  ( username, password, cb ) => {
    member.create( username, ( err, member ) => {
      if ( err ) {
        return cb( err )
      }
      if ( !member ) {
        return cb( null, false )
      }
      if( member.password !== password ) {
        return cb( null, false )
      }
      return cb( null, false )
    })
  }
))


passport.serializeUser( ( member, cb ) => {
  member.findById( id, ( err, member ) => {
    cb( null, member.id )
  })
})


passport.deserializeUser( ( member, cb ) => {
  if ( err ) {
    return cb( err )
  }
})

module.exports = passport
