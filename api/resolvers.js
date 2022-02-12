/* eslint-disable no-prototype-builtins */
const { ApolloError } = require('apollo-server-express');
// const { ApolloError } = require('apollo-server-errors');
const User = require('./users/user.model');
const AboutMe = require('./about/about.model');
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
    // About me
    addAboutMe: async (
      _,
      {
        userId,
        firstName,
        lastName,
        profession,
        linkUsername,
        aboutMeText,
        myPharse,
        socialNetworks,
        photo,
        coverImage,
      }
    ) => {
      try {
        const createAboutMe = servicesDb.createDocument(AboutMe, {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          profession: profession,
          linkUsername: linkUsername,
          aboutMeText: aboutMeText,
          myPharse: myPharse,
          socialNetworks: socialNetworks,
          photo: photo,
          coverImage: coverImage,
        });
        return createAboutMe;
      } catch (err) {
        return err;
      }
    },
    updateAboutMe: async (_, { id, ...data }) => {
      try {
        const editedAboutMe = await servicesDb.updateDocument(
          AboutMe,
          id,
          data
        );
        return editedAboutMe;
      } catch (err) {
        return err;
      }
    },
    deleteAboutMe: async (_, { id }) => {
      try {
        console.log(id);
        const deletedAboutMe = await servicesDb.deleteDocument(AboutMe, id);
        return deletedAboutMe;
      } catch (err) {
        return err;
      }
    },
    // Proyect
  },
  Query: {
    // users
    getUsers: async () => {
      try {
        const allUsers = await servicesDb.getAllDocument(User);
        return allUsers;
      } catch (err) {
        return err;
      }
    },
    getUserById: async (_, { id }) => {
      try {
        // console.log(id);
        const user = await servicesDb.getDocumentById(User, id);
        return user;
      } catch (err) {
        return err;
      }
    },
    // About
    getAboutMeByUser: async (_, { userId }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByUser(AboutMe, userId);
        return aboutMe;
      } catch (err) {
        console.Console('lili');
        return err;
      }
    },
  },
};

module.exports = resolvers;
