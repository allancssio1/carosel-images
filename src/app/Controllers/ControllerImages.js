const ImagesDB = require('../models/Images')
const Users = require('../models/Users')

module.exports = {
  async post (req, res) {
    const imagesFile = req.files
    const userId = req.body.userId

    if(imagesFile.length == 0) {
      return res.redirect(`/user/${userId}`)
    }

    let filesPromise = imagesFile.map(file => ImagesDB.create({...file, user_id: userId}))
    await Promise.all(filesPromise)

    return res.redirect(`/user/${userId}`)
  },
  async delete(req, res) {
    const imagesDeleted = req.body.removed_images.split(',')
    const lastIndex = imagesDeleted.length - 1
    imagesDeleted.splice(lastIndex, 1)
    const removedImagesPromise = imagesDeleted.map(id => {
      ImagesDB.delete(id)
    })
    await Promise.all(removedImagesPromise)
    return res.redirect(`/user/${req.body.userId}`)
  }
}