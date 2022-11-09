const { Schema, model } = require("mongoose");

const postSchema = Schema({
  comment: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
