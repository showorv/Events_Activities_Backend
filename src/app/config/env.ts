import dotenv from "dotenv"

dotenv.config()


export const envVars = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    NODE_ENV: process.env.NODE_ENV,

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD:process.env.SUPER_ADMIN_PASSWORD,

    HASH_SALT: process.env.HASH_SALT
}