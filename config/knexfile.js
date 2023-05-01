module.exports = {
    // client: 'pg',
    HOST: 'localhost',
    PORT: '8080',
    USER: 'postgres',
    PASSWORD: '123456789',
    DB: 'studioDance',
    dialect: "postgres",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}