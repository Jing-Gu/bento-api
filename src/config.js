import dotenv from "dotenv"

const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'
dotenv.config({path: envFile})

export const NODE_ENV = process.env.NODE_ENV
export const HOST = process.env.HOST
export const PORT = process.env.PORT
export const DB_URL = process.env.DB_URL