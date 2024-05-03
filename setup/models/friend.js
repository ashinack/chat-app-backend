module.exports = (sequelize, Sequelize) => {
  const Friend = sequelize.define("Friend", {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    userId1: {
      type: Sequelize.INTEGER,

      field: "userId1",
      allowNull: false,
    },
    userId2: {
      type: Sequelize.INTEGER,
      field: "userId2",
      allowNull: false,
      unique: true,
    },
    createdBy: {
      type: Sequelize.INTEGER,
      field: "createdBy",
      allowNull: true,
    },
    updatedBy: {
      type: Sequelize.INTEGER,
      field: "updatedBy",
      allowNull: true,
    },
  });
  return Friend;
};
