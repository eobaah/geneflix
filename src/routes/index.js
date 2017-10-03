const router = require( 'express' ).Router()
const passport = require( '../../authentication' )
const authRoutes = require( './authentication' )

router.use( '/', authRoutes)
router.use( passport.initialize() )
router.use( passport.session() )

module.exports = router
