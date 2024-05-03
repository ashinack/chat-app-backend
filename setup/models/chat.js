module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    id: {
      type: DataTypes.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    friend1: {
      type: DataTypes.INTEGER,

      field: "friend1",
      allowNull: false,
    },
    friend2: {
      type: DataTypes.INTEGER,
      field: "friend2",
      allowNull: false,
      unique: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: "createdBy",
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      field: "updatedBy",
      allowNull: true,
    },
  });
  return Chat;
};
