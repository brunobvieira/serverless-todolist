if (process.env.IS_OFFLINE || process.env.NODE_ENV == "local") {
    module.exports = {
        database: "todolist",
        dialect: "sqlite",
        storage: "database/db.sqlite"
    };
} else if (process.env.NODE_ENV == "development") {
    module.exports = {
        host: process.env.DBHOST_DEV,
        username: process.env.DBUSER_DEV,
        password: process.env.DBPASSWORD_DEV,
        database: process.env.DBDATABASE_DEV,
        dialect: process.env.DBDIALECT,
        port: process.env.DBPORT,
        pool: {
            min: 0,
            max: 1,
            idle: 10000
        }
    };
} else {
    module.exports = {
        host: process.env.DBHOST,
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASE,
        dialect: process.env.DBDIALECT,
        port: process.env.DBPORT,
        pool: {
            min: 0,
            max: 1,
            idle: 10000
        }
    };
}
