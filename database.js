const Sequelize = require("sequelize");

var db = {};

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_NAME,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        operatorsAliases: false,
    }
);

let models = [require("./models/userDetails"), require("./models/userStory")];

models.forEach((model) => {
    const seqModel = model(sequelize, Sequelize);
    db[seqModel.name] = seqModel;
});

Object.keys(db).forEach((key) => {
    if ("associate" in db[key]) {
        db[key].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
