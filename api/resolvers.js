/* eslint-disable no-prototype-builtins */
const { ApolloError } = require('apollo-server-express');
require('dotenv').config();
// const { ApolloError } = require('apollo-server-errors');
const User = require('./users/user.model');
const AboutMe = require('./about/about.model');
const Proyect = require('./proyects/proyect.model');
const Skill = require('./skills/proyect.model');
const services = require('./servicesDB');
const servicesDb = services();
const jwtAction = require('./auth');
const resolvers = {
  Mutation: {
    addUser: async (_, { name, nickname, email, picture }) => {
      // const userExistsByEmail = await servicesDb.existsByEmail(User, nickname);
      if (!nickname) {
        throw new ApolloError('The nickname it can not be null');
      }
      const userExistsByNickName = await servicesDb.existsByNickname(
        User,
        nickname
      );
      // console.log(userExistsByEmail, userExistsByUserName);
      // if (userExistsByEmail === 'null') {
      //   console.log('existe el usuario');
      //   throw new ApolloError('The email already exists');
      // }
      if (userExistsByNickName) {
        // console.log('existe el username', userExistsByNickName);
        const token = jwtAction.createToken(
          userExistsByNickName,
          process.env.SECRET,
          '24h'
        );
        // console.log('mi token', token);
        // throw new ApolloError('The nickname already exists');
        return { token: token };
      }
      try {
        // console.log('voya crearme');
        const createUser = await servicesDb.createDocument(User, {
          name: name,
          nickname: nickname,
          email: email,
          picture: picture,
          roles: {
            admin: false,
          },
        });
        console.log(createUser);
        const token = jwtAction.createToken(
          createUser,
          process.env.SECRET,
          '24h'
        );
        return { token: token };
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
    addProyect: async (
      _,
      {
        userId,
        proyectName,
        proyectType,
        description,
        startDate,
        endDate,
        linkDemo,
        linkRepo,
        imageProyect,
      }
    ) => {
      try {
        const createProyect = servicesDb.createDocument(Proyect, {
          userId: userId,
          proyectName: proyectName,
          proyectType: proyectType,
          description: description,
          startDate: startDate,
          endDate: endDate,
          linkDemo: linkDemo,
          linkRepo: linkRepo,
          imageProyect: imageProyect,
        });
        return createProyect;
      } catch (err) {
        return err;
      }
    },
    updateProyect: async (_, { id, ...data }) => {
      try {
        const editedProyect = await servicesDb.updateDocument(
          Proyect,
          id,
          data
        );
        return editedProyect;
      } catch (err) {
        return err;
      }
    },
    deleteProyect: async (_, { id }) => {
      try {
        console.log(id);
        const deletedProyect = await servicesDb.deleteDocument(Proyect, id);
        return deletedProyect;
      } catch (err) {
        return err;
      }
    },
    // Skill
    addSkill: async (_, { userId, skillName, skillLink, imageSkill }) => {
      try {
        const createSkill = servicesDb.createDocument(Skill, {
          userId: userId,
          skillName: skillName,
          skillLink: skillLink,
          imageSkill: imageSkill,
        });
        return createSkill;
      } catch (err) {
        return err;
      }
    },
    updateSkill: async (_, { id, ...data }) => {
      try {
        const editedSkill = await servicesDb.updateDocument(Skill, id, data);
        return editedSkill;
      } catch (err) {
        return err;
      }
    },
    deleteSkill: async (_, { id }) => {
      try {
        console.log(id);
        const deletedProyect = await servicesDb.deleteDocument(Skill, id);
        return deletedProyect;
      } catch (err) {
        return err;
      }
    },
  },
  Query: {
    // users

    getUserByToken: async (_, { token }) => {
      const user = await jwtAction.getUser(token, process.env.SECRET);
      return user;
    },
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
        return aboutMe[0];
      } catch (err) {
        console.Console('lili');
        return err;
      }
    },
    // Proyect
    getProyectByUser: async (_, { userId }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByUser(Proyect, userId);
        return aboutMe;
      } catch (err) {
        console.Console('lili');
        return err;
      }
    },
    // Skill
    getSkillByUser: async (_, { userId }) => {
      try {
        // console.log(userId);
        const skills = await servicesDb.getDocumentByUser(Skill, userId);
        return skills;
      } catch (err) {
        console.Console('lili');
        return err;
      }
    },
  },
};

module.exports = resolvers;
