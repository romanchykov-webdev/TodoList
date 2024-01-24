const Router = require("express")
const User = require("../models/Users")
const router = new Router()
const bcrypt = require('bcrypt');
const {check, validationResult} = require("express-validator")
const config = require("config")

const jwt = require('jsonwebtoken');

// registration
router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12})
    ],
    async (req, res) => {

        try {
            console.log(req.body)

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }


            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }

            const hashPassword = await bcrypt.hash(password, 5)

            const user = new User({email, password: hashPassword})

            await user.save
            return res.json({message: "User was created"})

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }
)

// logIn
router.get('/login',

    async (req, res) => {

        try {

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(404).json({message: "User not found"})
            }

            const isPassValid = bcrypt.compareSync(password, user.password)

            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }

            const token = jwt.sign({di: user.id}, config.get("secretKey"), {expiresIn: "1h"})

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar
                }
            })

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }
)


module.exports = router;