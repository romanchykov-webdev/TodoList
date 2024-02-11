const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const chalk = require('chalk');

const errorMsg = chalk.bgKeyword('red').whiteBright;
const successMsg = chalk.bgKeyword('white').greenBright;

const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "default-private-key";

const corsMiddleWare = require("./middleware/cors.middleware");
app.use(corsMiddleWare);

const filePathMiddleware = require("./middleware/filepath.middleware");
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));

const authRouter = require("./routes/auth.routes");
app.use(express.json());
app.use("/api/auth", authRouter);

app.use(express.static('static'));

const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        app.listen(PORT, () => {
            console.log(successMsg("Server started on port: ", PORT));
            console.log(successMsg("Server started on MONGO_URL: ", MONGO_URL));
            console.log(successMsg("Server started on PRIVATE_KEY: ", PRIVATE_KEY));
        });
    } catch (e) {
        console.log(errorMsg(e));
    }
};

start();
