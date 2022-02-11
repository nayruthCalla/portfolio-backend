/* eslint-disable no-prototype-builtins */
const { ApolloError } = require('apollo-server-express');
// const { ApolloError } = require('apollo-server-errors');
const User = require('./users/user.model');
const services = require('./servicesDB');
const servicesDb = services();
const resolvers = {
  Mutation: {
    addUser: async (_, { fullName, userName, email, photo }) => {
      const userExistsByEmail = await servicesDb.existsByEmail(User, email);
      const userExistsByUserName = await servicesDb.existsByUsername(
        User,
        userName
      );
      // console.log(userExistsByEmail, userExistsByUserName);
      if (userExistsByEmail === 'null') {
        throw new ApolloError('The email already exists');
      }
      if (userExistsByUserName === 'null') {
        throw new ApolloError('The userName already exists');
      }
      try {
        const createUser = servicesDb.createDocument(User, {
          fullName: fullName,
          userName: userName,
          email: email,
          photo: photo,
          roles: {
            admin: false,
          },
        });
        return createUser;
      } catch (err) {
        return err;
      }
    },
    updateUser: async (_, { id, ...data }) => {
      try {
        const editedUser = await servicesDb.updateDocument(User, id, data);
        return editedUser;
      } catch (err) {
        return err;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await servicesDb.deleteDocument(User, id);
        return deletedUser;
      } catch (err) {
        return err;
      }
    },
  },
  Query: {
    getUsers: async () => {
      try {
        const allUsers = servicesDb.getAllDocument(User);
        return allUsers;
      } catch (err) {
        return err;
      }
    },
    getUserById: async (_, { id }) => {
      try {
        // console.log(id);
        const user = servicesDb.getDocumentById(User, id);
        return user;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = resolvers;
