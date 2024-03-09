module.exports = (sequelize, DataTypes) => {
  const Flower = sequelize.define("flowers", {
    flowerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Available",
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Flower;
};
