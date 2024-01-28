const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('../config/default.json'); // Подставьте свой путь к файлу конфигурации
const User = require('../models/Users'); // Подставьте свой путь к модели User

// Миддлвэр для проверки токена
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Отсутствует токен авторизации' });
    }

    jwt.verify(token, config.get('secretKey'), (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Неверный токен' });
        }

        req.user = user;
        next();
    });
};

// Пример маршрута для получения todos после логина
router.get('/todos', verifyToken, async (req, res) => {
    try {
        // req.user содержит информацию о пользователе из токена
        const userId = req.user.id;

        // Здесь вы можете использовать userId для запроса todos пользователя из базы данных
        const user = await User.findById(userId).populate('todos'); // Предполагается, что есть поле 'todos' в вашей схеме

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        console.log(user.todos);
        return res.json({ todos: user.todos });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/add-todos', authMiddleware, async (req, res) => {
    try {
        const newCards = req.body;

        const userId = req.user.id;

        // Находим пользователя по ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Добавляем новые карты в массив todos пользователя
        user.todos.push(...newCards);

        // Сохраняем изменения в базе данных
        await user.save();

        return res.json({ message: 'Массив объектов успешно добавлен в todos пользователя', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
module.exports = router;
