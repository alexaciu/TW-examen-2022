const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
    logging: false,
});

async function main() {
    try {
      // await sequelize.query('PRAGMA foreign_keys = off');
      await sequelize.sync({ alter: false });
      // await sequelize.query('PRAGMA foreign_keys = on');
    } catch (e) {
      console.error(e);
    }
}
main();

module.exports = sequelize;