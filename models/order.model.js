module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("orders", {
      fio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Order;
  };
  