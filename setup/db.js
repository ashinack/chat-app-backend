const dbConfig = require("./db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.db,
  dbConfig.username,
  dbConfig.password,
  dbConfig.main_db_options
);

const db = {
  seqlib: Sequelize,
  seq: sequelize,
  User: require("./models/user")(sequelize, Sequelize),
  Chat: require("./models/chat")(sequelize, Sequelize),
  Message: require("./models/message")(sequelize, Sequelize),
  Friend: require("./models/friend")(sequelize, Sequelize),
};

db.User.hasOne(db.User, { foreignKey: "createdBy" });
db.User.belongsTo(db.User, { foreignKey: "createdBy" });

db.User.hasOne(db.Friend, { foreignKey: "userId1" });
db.Friend.belongsTo(db.User, { foreignKey: "userId1" });

db.User.hasOne(db.Friend, { foreignKey: "userId2" });
db.Friend.belongsTo(db.User, { foreignKey: "userId2" });

db.User.hasOne(db.Friend, { foreignKey: "createdBy" });
db.Friend.belongsTo(db.User, { foreignKey: "createdBy" });

db.User.hasOne(db.Friend, { foreignKey: "updatedBy" });
db.Friend.belongsTo(db.User, { foreignKey: "updatedBy" });

db.Friend.hasOne(db.Chat, { foreignKey: "friend1" });
db.Chat.belongsTo(db.Friend, { foreignKey: "friend1" });

db.User.hasOne(db.Chat, { foreignKey: "friend2" });
db.Chat.belongsTo(db.User, { foreignKey: "friend2" });

db.User.hasOne(db.Chat, { foreignKey: "createdBy" });
db.Chat.belongsTo(db.User, { foreignKey: "createdBy" });

db.User.hasOne(db.Chat, { foreignKey: "updatedBy" });
db.Chat.belongsTo(db.User, { foreignKey: "updatedBy" });

module.exports = db;
