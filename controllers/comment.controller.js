const db = require("../models/index.model");
Comment = db.comments;

// Description -------- Post Comments
// Method -------- POST
// Access -------- Public

exports.sendComment = async (req, res) => {
  try {
    const { feedback } = req.body;

    await Comment.create({
      feedback,
    });

    res.redirect("/flowers/main");
  } catch (error) {
    console.log(error);
  }
};
