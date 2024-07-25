const { where } = require("sequelize");
const db = require("./db");

db.User.addHook("afterCreate", async (instance, options) => {
  console.log(instance, "Instance created");
  await db.User.update(
    { name: "Ashina" },
    {
      where: {
        id: 12,
      },
    }
  );
});
