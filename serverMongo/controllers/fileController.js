const config = require('config')
const fs = require('fs')
const User = require('../models/Users')
const Uuid = require('uuid')




class FileController {


    async uploadAvatar(req, res) {
        try {

            const file = req.files.file;
            const user = await User.findById(req.user.id)
            const avatarName = Uuid.v4() + '.jpg'
            file.mv(config.get('staticPath') + "\\" + avatarName)
            user.avatar = avatarName
            await user.save()
            return res.json(user)

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Upload avatar error'})
        }
    }

    async deleteAvatar(req, res) {
        try {

            const user = await User.findById(req.user.id)
            fs.unlinkSync(config.get('staticPath') + "\\" + user.avatar)
            user.avatar = null
            await user.save()
            return res.json(user)

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Delete avatar error'})
        }
    }
}

module.exports = new FileController()