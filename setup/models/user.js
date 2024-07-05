module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,

      field: "name",
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      field: "email",
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: Sequelize.BIGINT(10),
      field: "mobile",
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      field: "password",
      allowNull: false,
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
  return User;
};
