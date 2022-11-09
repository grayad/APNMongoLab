const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // an array of user posts
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  }
  //   {
  //     toJSON: {
  //       virtuals: true,
  //     },
  //     id: false,
  //   }
);

// virtual called postCount that retrieves the length of the user's posts array field on query.
// userSchema.virtual("postCount").get(function () {
//   return this.posts.length;
// });

const User = model("User", userSchema);

module.exports = User;
