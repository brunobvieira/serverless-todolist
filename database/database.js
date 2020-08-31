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
        database: process.env.DBDATABASE_DEV ? process.env.DBDATABASE_DEV : "todolist_dev",
        dialect: process.env.DBDIALECT ? process.env.DBDIALECT : "mysql",
        port: process.env.DBPORT ? process.env.DBPORT : 3306,
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
        dialect: process.env.DBDIALECT ? process.env.DBDIALECT : "mysql",
        port: process.env.DBPORT ? process.env.DBPORT : 3306,
        pool: {
            min: 0,
            max: 1,
            idle: 10000
        }
    };
}
