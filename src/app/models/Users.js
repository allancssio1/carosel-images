const db = require('../../config/db')

module.exports = {
  all() {
    return db.query(`SELECT * FROM users`)
  },
  create(data) {
    const query = `INSERT INTO users (name, username, password, email)
      VALUES ($1, $2, $3, $4)
      RETURNING id`
    const values = [data.name, data.username, data.password, data.email]
    return db.query(query, values)
  },
  find(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id])
  },
  update(data) {
    const query = `UPDATE users SET name=($1), username=($2), password=($3), email=($4)
      WHERE id=$5`
      
    const values = [data.name, data.username, data.password, data.email]
    
    return db.query(query, values)
  },
  delete(id) {
    return db.query(`DELETE FROM users WHERE id = $1`, [id])
  }
}