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
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
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

router.get(
    '/auth', authMiddleWare,

    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
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
        // req.user содержит информацию о пользователе из токена
        const userId = await User.findOne({_id: req.user.id})


        // Здесь вы можете использовать userId для запроса todos пользователя из базы данных
        const user = await User.findById(userId).populate('todos'); // Предполагается, что есть поле 'todos' в вашей схеме

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

        const userId = req.body.userId; // Предполагается, что вы передаете идентификатор пользователя в теле запроса
        const newTodos = req.body.newTodos; // Предполагается, что вы передаете массив новых объектов в теле запроса

        // Находим пользователя по его идентификатору
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Добавляем новые объекты в массив todos пользователя
        user.todos.push(...newTodos);

        // Сохраняем изменения в базе данных
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
        const userId = req.user.id; // Получаем идентификатор пользователя из токена
        const { newTodo } = req.body; // Получаем новый todo из тела запроса

        // Находим пользователя по его идентификатору
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Добавляем новый объект в массив todos пользователя
        user.todos.push(newTodo);

        // Сохраняем изменения в базе данных
        await user.save();

        return res.json({ message: 'Объект успешно добавлен в массив todos пользователя', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/update-todo', authMiddleWare, async (req, res) => {
    try {
        const userId = req.user.id;
        const { newTodo } = req.body;

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

module.exports = router;