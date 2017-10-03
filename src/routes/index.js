const router = require( 'express' ).Router()
const passport = require( '../../authentication' )
const authRoutes = require( './authentication' )

router.use( passport.initialize() )
router.use( passport.session() )
router.use( '/', authRoutes( passport ))

module.exports = router
