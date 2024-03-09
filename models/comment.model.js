module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comments", {
    feedback: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Comment;
};
