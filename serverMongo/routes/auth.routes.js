const Router = require("express")
const User = require("../models/Users")
const path = require('path');
const fileUpload = require('express-fileupload');
// const fs = require("fs");
// const Uuid = require("uuid");
const router = new Router()
const bcrypt = require('bcryptjs');
const {check, validationResult} = require("express-validator")
const config = require("config")

const jwt = require('jsonwebtoken');

// const PRIVATE_KEY = process.env.PRIVATE_KEY || config.get("secretKey")
const PRIVATE_KEY = process.env.PRIVATE_KEY

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

            const hashPassword = await bcrypt.hash(password, 8)

            const user = new User({email, password: hashPassword})

            await user.save();
            return res.json({message: "User was created"})

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }
)

// logIn
router.post('/login',
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
            // const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            const token = jwt.sign({id: user.id}, PRIVATE_KEY, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar,
                    colorsPalette: user.colorsPalette,
                    todos: user.todos
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


// is auth
const authMiddleWare=require("../middleware/auth.middleware")
const Uuid = require("uuid");
const fs = require("fs");

router.get(
    '/auth', authMiddleWare,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})

            // const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            const token = jwt.sign({id: user.id}, PRIVATE_KEY, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar,
                    colorsPalette: user.colorsPalette,
                    todos: user.todos
                }
            })


        } catch (e) {
            console.error(e);
            res.status(500).send({message: 'Server error'});
        }
    }
);

// get todos
router.get('/todos', authMiddleWare,
    async (req, res) => {
    try {

        const userId = await User.findOne({_id: req.user.id})



        const user = await User.findById(userId).populate('todos');

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        console.log(user.todos)
        return res.json({ todos: user.todos });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


// add todo
router.post('/add-todos',authMiddleWare ,
    async (req, res) => {
    try {

        const userId = req.body.userId;
        const newTodos = req.body.newTodos;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }


        user.todos.push(...newTodos);


        await user.save();

        return res.json({ message: 'Массив объектов успешно добавлен в todos пользователя', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


// Добавление todo
router.post('/add-todo', authMiddleWare, async (req, res) => {
    try {
        const userId = req.user.id;
        const { newTodo } = req.body;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }


        user.todos.push(newTodo);


        await user.save();

        return res.json({ message: 'Объект успешно добавлен в массив todos пользователя', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/update-todo', authMiddleWare, async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.id;
        const { newTodo } = req.body;

        if (!newTodo || typeof newTodo !== 'object' || !newTodo.id) {
            return res.status(400).json({ message: 'Некорректный формат данных в запросе' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const todoIndex = user.todos.findIndex(todo => todo.id === newTodo.id);

        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo с указанным ID не найден' });
        }

        user.todos[todoIndex] = newTodo;
        await user.save();

        return res.json({ message: 'Объект успешно добавлен в массив todos пользователя', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: error.message });
    }
});

router.delete('/delete-todo/:todoId', authMiddleWare, async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.todoId;

        if (!todoId) {
            return res.status(400).json({ message: 'Отсутствует идентификатор todo для удаления' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        user.todos = user.todos.filter(todo => todo.id !== todoId);
        await user.save();

        return res.json({ message: 'Объект успешно удален из массива todos пользователя', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: error.message });
    }
});


// Загрузка аватара
router.use(fileUpload());
router.post('/avatar', authMiddleWare, async (req, res) => {
    try {
        console.log(req.user);

        const file = req.files.file;
        const user = await User.findById(req.user.id);

        // delete old avatar
        if (user.avatar) {
            const oldAvatarPath = path.join(config.get('staticPath'), user.avatar);
            fs.unlinkSync(oldAvatarPath);
        }

        const modifiedEmail = user.email.replace(/[@.]/g, '-');
        const avatarName = modifiedEmail + '-' + Uuid.v4() + '.jpg';

        console.log('file:', file);
        console.log('user:', user);
        console.log('avatarName:', avatarName);

        file.mv(config.get('staticPath') + "\\" + avatarName);
        user.avatar = avatarName;
        await user.save();
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Upload avatar error' });
    }
});

// Удаление аватара
router.delete('/avatar', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.avatar) {
            return res.status(404).json({ message: 'User or avatar not found' });
        }


        const avatarPath = path.join(config.get('staticPath'), user.avatar);
        fs.unlinkSync(avatarPath);


        user.avatar = null;
        await user.save();

        return res.json({ message: 'Avatar deleted successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error deleting avatar', error: error.message });
    }
});


module.exports = router;