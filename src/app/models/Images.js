const db = require('../../config/db')
const fs = require('fs')

module.exports = {
  all(id){
    return db.query(`
      SELECT * FROM images
      WHERE user_id = $1`, [id])
  },
  create({filename, path, user_id}) {
    const query = `
      INSERT INTO images (title, path, user_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `
    const values = [filename, path, user_id]
    return db.query(query, values)
  },
  async delete(id) {
    try {
      const result = await db.query(`SELECT * FROM images WHERE id = $1`, [id])
      const image = result.row[0]
      fs.unlinkSync(image.path)

    }catch(err) {
      console.error(err)
    }
    

    return db.query(`DELETE FROM images WHERE id = $1`, [id])
  }
}