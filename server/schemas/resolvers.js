// # 26
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // addUser: async (parent, { username, email, password }) => {
    //   const user = await User.create({ username, email, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password })
        const token = signToken(user);
        return { token, user };
      },
        // const user = await User.create({
        //   thoughtText,
        //   thoughtAuthor: context.user.username,
        // });

      //   await User.findOneAndUpdate(
      //     { _id: context.user._id },
      //     { $addToSet: { thoughts: thought._id } }
      //   );

      //   return thought;
      // }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    
    // fix this
    saveBook: async (parent, { content } ,context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { savedBooks: content },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    // fix this
    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;

    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
