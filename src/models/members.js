const db = require( './database/members' )

module.exports = {
  create: db.create,
  isValidPassword: db.isValidPassword,
  findById: db.findById,
  findByEmail: db.findByEmail,
  findByUsername: db.findByUsername,
  getUsername: db.getUsername,
  destroy: db.destroy
}
