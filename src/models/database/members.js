const db = require( './database' )
const brcypt = require( 'bcrypt' )
const saltRounds = process.env.SALT

const create = ( username, email, password ) => {
  bcrypt.hash( password, saltRounds )
    .then( hash => {
      return db.query(`
        INSERT INTO member
          ( username, email, password )
        VALUES
          ( $1, $2, $3 )
        RETURNING *
            `,
        [ username, email, password ] )
    })
    .catch( error => {
      console.err({
        message: 'Error occurred when creating member',
        arguments: arguments
      })
      throw error
    })
}

const isValidPassword = (id, password) =>  {
  return findById(id)
    .then( member => {
      return bcrypt.compare( password, member.password )
    })
}

const findById = id => {
  return db.oneOrNone( `
    SELECT * FROM member
    WHERE id=$1`,
    [ id ] )
    .catch( error => {
      console.err({
        message: 'Error occurred when trying to find id',
        arguments: arguments
      })
      throw error
    })
}

const findByEmail = email => {
  return db.oneOrNone( `
    SELECT * FROM member
    WHERE email=$1`,
    [ email ] )
    .catch( error => {
      console.err({
        message: 'Error occurred when trying to find email',
        arguments: arguments
      })
      throw error
    })
}

const findByUsername = username => {
  return db.oneOrNone( `
    SELECT * FROM member
    WHERE username=$1`,
    [ username ] )
    .catch( error => {
      console.err({
        message: 'Error occurred when trying to find username',
        arguments: arguments
      })
      throw error
    })
}

const getUsername = id => {
  return db.oneOrNone( `
    SELECT username FROM member
    WHERE id=$1`,
    [ id ] )
    .catch( error => {
      console.err({
        message: 'Error occurred when trying to find email',
        arguments: arguments
      })
      throw error
    })
}

const destroy = id => {
  return db.query( `
    DELETE FROM member
    WHERE id=$1
    RETURNING *`,
    [ id ] )
    .catch( error => {
      console.err({
        message: 'Error occurred when trying to find email',
        arguments: arguments
      })
      throw error
    })
}

module.exports = {
  create,
  isValidPassword,
  findById,
  findByEmail,
  findByUsername,
  getUsername,
  destroy
}
