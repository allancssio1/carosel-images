const ImagesDB = require('../models/Images')
const UsersDB = require('../models/Users')

module.exports = {
  async index(req, res) {
    let results = await UsersDB.all()
    const users = results.rows

    return res.render('index', {users})
  },
  async create(req, res) {
    return res.render('admin/create.njk')
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys){
      if( req.body[key] == ""){
        return res.send ("Preencha todos os dados")
      }
    }

    let results = await UsersDB.all()
    const usersAll = results.rows
    
    const userExist = usersAll.find(user => {
      return user.username == req.body.username && user.email == req.body.email
    })
    
    if(userExist) {
      return res.send('usuário ja existe')
    }
    
    let user = await UsersDB.create(req.body)
    const userId = user.rows[0].id
    
    return res.redirect(`/user/${userId}`)
  },
  async login(req, res) {
    return res.render('admin/entre.njk')
  },
  async entre(req, res) {
    const keys = Object.keys(req.body)
    const username = req.body.username
    const password = req.body.password

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send("Preencha todos os dados")
      }
    }

    let results = await UsersDB.all()
    const usersAll = results.rows
    
    const userExist = usersAll.find(user => {
      if(user.username == username && user.password == password) {
        return true
      }
    })
    console.log(userExist)    

    if(userExist) {
      return res.redirect(`/user/${userExist.id}`)
    }
    return res.send('Usuário não encontrado')
  },
  async show (req, res) {
    const userId = req.params.id
    
    let results = await UsersDB.find(userId)
    const user = results.rows[0]

    results = await ImagesDB.all(userId)
    let images = results.rows
    images = images.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('admin/show.njk', {user, images})
  },
  async edit (req, res) {
    const userId = req.params.id
    let results = await UsersDB.find(userId)
    const user = results.rows[0]

    results = await ImagesDB.all(userId)
    let images = results.rows

    images = images.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))
    return res.render('admin/edit.njk', {user, images})
  },
  async put (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send("Preencha todos os dados")
      }
    }

    let results = await UsersDB.all()
    const usersAll = results.rows
    
    const userExist = usersAll.find(user => {
      return user.username == req.body.username && user.email == req.body.email
    })

    if(userExist) {
      return res.send('usuário ja existe')
    }

    results = UsersDB.update(req.body)
    const userId = results.rows[0].id

    return res.redirect(`/user/${userId}`)
  },
  async delete(req, res){

    return
  }
}