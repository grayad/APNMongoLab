const graphql = require("graphql");
const User = require("./model/user");
const Post = require("./model/post");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// Type Defs
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userID: parent._id });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Posts",
  description: "The user posts.",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    userID: {
      //   type: GraphQLID,
      type: UserType,
      resolve(parent, args) {
        return User.find({ posts: { _id: parent._id } });
      },
    },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return User.findById(args.id);
        //Data Resolves
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      },
    },
  },
});

//Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        return user.save();
      },
    },

    CreatePost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let post = Post({
          comment: args.comment,
          userID: args.userID,
        });
        return post.save();
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
