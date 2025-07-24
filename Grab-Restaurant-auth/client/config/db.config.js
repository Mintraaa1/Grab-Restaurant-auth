import dotenv from "dotenv";
dotenv.config()

const config = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    DBPORT: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};