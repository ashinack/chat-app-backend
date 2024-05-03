module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("Message", {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: Sequelize.INTEGER,

      field: "senderId",
      allowNull: false,
    },
    recipientId: {
      type: Sequelize.INTEGER,
      field: "recipientId",
      allowNull: false,
    },
    message: {
      type: Sequelize.BLOB,
      field: "message",
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      field: "status",
      allowNull: false,
    },
    sentTime: {
      type: Sequelize.DATE,
      field: "sentTime",
      allowNull: true,
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
  return Message;
};
