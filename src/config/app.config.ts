export default() => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER || 'user',
        password: process.env.DATABASE_PASSWORD || 'password',
        name: process.env.DATABASE_NAME || 'database',
    },
})