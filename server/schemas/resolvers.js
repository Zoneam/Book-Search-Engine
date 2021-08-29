const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const signToken = require("../utils/auth.js");

const resolvers = {
  Query: {
    user: async (parent, { args }) => {
      const userData = await User.findOne({ args }).populate("savedBooks");
      return userData;
    },

    users: async () => {
      return User.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedBooks");
      }
      throw new AuthenticationError("You are not logged in.");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials!");
      }
      const checkPass = await user.isCorrectPassword(password);
      if (!checkPass) {
        throw new AuthenticationError("Incorrect Credentials!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { userName, email, password }) => {
      const user = await User.create({ userName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const usersBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } }
        );
      }
      return usersBooks;
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const deleteBooks = await User.findOneAndUpdate(
          { _id: context.user.id },
          { $pull: { savedBooks: { bookId } } }
        );
      }
      return deleteBooks;
    },
  },
};
