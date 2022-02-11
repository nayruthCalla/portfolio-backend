/* eslint-disable */
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('./user.services');
// const { ApolloError } = require('apollo-server-express');

// const users = [
//   {
//     id: '1',
//     fullname: 'Nay',
//     username: 'nay',
//     email: 'nayruth.calla@gmail.com',
//     roles: {
//       admin: false,
//     },
//     photo: '',
//   },
//   {
//     id: '2',
//     fullname: 'Fa',
//     username: 'fay',
//     email: 'nayruth+1.calla@gmail.com',
//     roles: {
//       admin: true,
//     },
//     photo: '',
//   },
// ];
// console.log(users);
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: async (parent, args, context, info) => {
      try {
        const res = await createUser({
          fullname: args.fullname,
          username: args.username,
          email: args.email,
        });
        return res;
      } catch {
        return 'error';
      }
    },
  },
};

module.exports = resolvers;
