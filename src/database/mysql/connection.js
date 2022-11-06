import { createPool } from 'mysql2/promise'

export const connection = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE || 'companydb'
})