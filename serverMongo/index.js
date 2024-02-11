const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const dotenv = require('dotenv');

const app = express();

// Установка переменной окружения для пути к файлу конфигурации
dotenv.config({ path: '.env' });

// Порт и URL для MongoDB должны браться из переменных окружения или файла конфигурации
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

// Остальные настройки сервера...

// Запуск сервера
const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        app.listen(PORT, () => {
            console.log(chalk.greenBright(`Server started on port: ${PORT}`));
            console.log(chalk.greenBright(`MongoDB connected at: ${MONGO_URL}`));
            console.log(chalk.greenBright(`Private key: ${PRIVATE_KEY}`));
        });
    } catch (e) {
        console.log(chalk.redBright(e));
    }
};

start();
