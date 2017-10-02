module.exports = ( () => {
  let config = {}

  const getEnv = () => {
    return process.env.NODE_ENV
  }

  const makeConfig = () => {
    if ( getEnv() === 'development' ) {
      require( 'dotenv' ).config( {path: __dirname + '../../.env'})
    }

    config = {
      db: {
        url: process.env.DB_URL,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      session: {
        secret: process.env.SECRET
      }
    }
    return config
  }

  makeConfig()

  const getConfig = () => {
    return config
  }

  return {
    getConfig,
    getEnv
  }

})()
