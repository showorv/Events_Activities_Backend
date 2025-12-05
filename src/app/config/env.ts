import dotenv from "dotenv"

dotenv.config()


export const envVars = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    NODE_ENV: process.env.NODE_ENV,

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD:process.env.SUPER_ADMIN_PASSWORD,

    HASH_SALT: process.env.HASH_SALT,

    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_SECRET_KEY:process.env.CLOUDINARY_SECRET_KEY as string,



JWT_SECRET: process.env.JWT_SECRET,
JWR_EXPIRED:process.env.JWR_EXPIRED,

JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,

JWT_REFRESH_EXPIRED:process.env.JWT_REFRESH_EXPIRED
}