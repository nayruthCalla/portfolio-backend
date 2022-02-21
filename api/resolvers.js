/* eslint-disable no-prototype-builtins */
const { ApolloError } = require('apollo-server-express');
require('dotenv').config();
const User = require('./users/user.model');
const AboutMe = require('./about/about.model');
const Proyect = require('./proyects/proyect.model');
const Skill = require('./skills/proyect.model');
const Logros = require('./Logros/logros.model');
const services = require('./servicesDB');
const servicesDb = services();
const jwtAction = require('./auth');
const resolvers = {
  Mutation: {
    addUser: async (_, { name, nickname, email, picture }) => {
      if (!nickname) {
        throw new ApolloError('The nickname it can not be null');
      }
      const userExistsByNickName = await servicesDb.existsByNickname(
        User,
        nickname
      );
      if (userExistsByNickName) {
        const token = jwtAction.createToken(
          userExistsByNickName,
          process.env.SECRET,
          '24h'
        );

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
    updateUser: async (
      _,
      { userName, name, nickname, email, picture },
      context
    ) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const exitUsername = await servicesDb.existsByUserName(User, userName);
        // console.log(exitUsername);
        if (exitUsername) {
          throw new ApolloError('Eser name already existsx');
        }
        const userDB = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        // console.log(context.user._id);
        if (
          userDB._id === context.user._id ||
          userDB.roles.admin === context.user.roles.admin
        ) {
          const editedUser = await servicesDb.updateDocument(
            User,
            context.user._id,
            {
              userName: userName,
              name: name,
              nickname: nickname,
              email: email,
              picture: picture,
              roles: {
                admin: false,
              },
            }
          );
          return editedUser;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
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
        firstName,
        lastName,
        profession,
        linkUsername,
        aboutMeText,
        interests,
        socialNetworks,
        photo,
        coverImage,
      },
      context
    ) => {
      // console.log(context.user);
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const userDB = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        if (
          userDB._id === context.user._id ||
          userDB.roles.admin === context.user.roles.admin
        ) {
          const createAboutMe = servicesDb.createDocument(AboutMe, {
            userId: context.user._id,
            userName: userDB.userName,
            firstName: firstName,
            lastName: lastName,
            profession: profession,
            linkUsername: linkUsername,
            aboutMeText: aboutMeText,
            interests: interests,
            socialNetworks: socialNetworks,
            photo: photo,
            coverImage: coverImage,
          });
          return createAboutMe;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    updateAboutMe: async (
      _,
      {
        id,
        firstName,
        profession,
        aboutMeText,
        interests,
        socialNetworks,
        photo,
      },
      context
    ) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const proyect = await servicesDb.getDocumentById(AboutMe, id);
        if (
          proyect.userId.userId === context.user._id ||
          proyect.userId.roles.admin === context.user.roles.admin
        ) {
          const editedAboutMe = await servicesDb.updateDocument(AboutMe, id, {
            firstName: firstName,
            profession: profession,
            aboutMeText: aboutMeText,
            interests: interests,
            socialNetworks: socialNetworks,
            photo: photo,
          });
          return editedAboutMe;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    deleteAboutMe: async (_, { id }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const about = await servicesDb.getDocumentById(AboutMe, id);
        if (
          about.userId.userId === context.user._id ||
          about.userId.roles.admin === context.user.roles.admin
        ) {
          const deletedAboutMe = await servicesDb.deleteDocument(AboutMe, id);
          return deletedAboutMe;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    // Proyect
    addArrProyects: async (_, { proyects }, context) => {
      // console.log(proyects);
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const createProyect = servicesDb.createDocuments(Proyect, proyects);
        console.log(createProyect);
        return createProyect;
      } catch (err) {
        return err;
      }
    },
    addProyect: async (
      _,
      {
        proyectName,
        level,
        description,
        techFirst,
        techSecond,
        links,
        imageProyect,
      },
      context
    ) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const userDB = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        if (
          userDB._id === context.user._id ||
          userDB.roles.admin === context.user.roles.admin
        ) {
          const createProyect = servicesDb.createDocument(Proyect, {
            userId: context.user._id,
            userName: userDB.userName,
            proyectName: proyectName,
            level: level,
            description: description,
            techFirst: techFirst,
            techSecond: techSecond,
            links: links,
            imageProyect: imageProyect,
          });
          return createProyect;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    updateProyect: async (
      _,
      {
        id,
        // userId,
        proyectName,
        level,
        description,
        techFirst,
        techSecond,
        links,
        imageProyect,
      },
      context
    ) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const proyect = await servicesDb.getDocumentById(Proyect, id);
        if (
          proyect.userId.userId === context.user._id ||
          proyect.userId.roles.admin === context.user.roles.admin
        ) {
          const editedProyect = await servicesDb.updateDocument(Proyect, id, {
            userId: context.user._id,
            proyectName: proyectName,
            level: level,
            description: description,
            techFirst: techFirst,
            techSecond: techSecond,
            links: links,
            imageProyect: imageProyect,
          });
          return editedProyect;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },

    deleteProyect: async (_, { id }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const proyect = await servicesDb.getDocumentById(Proyect, id);
        if (
          proyect.userId.userId === context.user._id ||
          proyect.userId.roles.admin === context.user.roles.admin
        ) {
          const deletedProyect = await servicesDb.deleteDocument(Proyect, id);
          return deletedProyect;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (e) {
        return e;
      }
    },
    // Skill
    addSkill: async (_, { skillName }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const userDB = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        if (
          userDB._id === context.user._id ||
          userDB.roles.admin === context.user.roles.admin
        ) {
          const createSkill = servicesDb.createDocument(Skill, {
            userId: context.user._id,
            userName: userDB.userName,
            skillName: skillName,
          });
          return createSkill;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    updateSkill: async (_, { id, skillName }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const skill = await servicesDb.getDocumentById(Skill, id);
        if (
          skill.userId.userId === context.user._id ||
          skill.userId.roles.admin === context.user.roles.admin
        ) {
          const editedSkill = await servicesDb.updateDocument(Skill, id, {
            skillName: skillName,
          });
          console.log(editedSkill);
          return editedSkill;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    deleteSkill: async (_, { id }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const skill = await servicesDb.getDocumentById(Skill, id);
        if (
          skill.userId.userId === context.user._id ||
          skill.userId.roles.admin === context.user.roles.admin
        ) {
          const deletedProyect = await servicesDb.deleteDocument(Skill, id);
          return deletedProyect;
        }
        // console.log(id);
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },

    // Logros
    addLogros: async (_, { title, description }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const userDB = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        if (
          userDB._id === context.user._id ||
          userDB.roles.admin === context.user.roles.admin
        ) {
          const createLogros = servicesDb.createDocument(Logros, {
            userId: context.user._id,
            userName: userDB.userName,
            title: title,
            description: description,
          });
          return createLogros;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    updateLogros: async (_, { id, title, description }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const logros = await servicesDb.getDocumentById(Logros, id);
        if (
          logros.userId.userId === context.user._id ||
          logros.userId.roles.admin === context.user.roles.admin
        ) {
          const editedLogros = await servicesDb.updateDocument(Logros, id, {
            title: title,
            description: description,
          });
          // console.log(editedLogros);
          return editedLogros;
        }
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
      } catch (err) {
        return err;
      }
    },
    deleteLogros: async (_, { id }, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const logros = await servicesDb.getDocumentById(Logros, id);
        if (
          logros.userId.userId === context.user._id ||
          logros.userId.roles.admin === context.user.roles.admin
        ) {
          const deletedProyect = await servicesDb.deleteDocument(Logros, id);
          return deletedProyect;
        }
        // console.log(id);
        throw new ApolloError(
          'You are not authorized because it is not the same user'
        );
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
    getUser: async (_, args, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const userDB = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        if (!userDB) {
          throw new ApolloError('Not exists user');
        }
        return userDB;
      } catch (err) {
        return err;
      }
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
    getAboutMeByUserName: async (_, { userName }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByIdUserName(
          AboutMe,
          userName
        );
        console.log(aboutMe);
        return aboutMe[0];
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    getAboutMe: async (_, agrs, context) => {
      // console.log('');
      // console.log('hola fuer');
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const about = await servicesDb.getDocumentByUser(
          AboutMe,
          context.user._id
        );
        // console.log(about, 'user');
        if (!about) {
          console.log('if av');
          return [];
        }
        return about;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    // Proyect
    getProyectByUser: async (_, agrs, context) => {
      // console.log('');
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        const proyect = await servicesDb.getDocumentByUser(
          Proyect,
          context.user._id
        );
        // console.log(proyect);
        if (!proyect) {
          return [];
        }
        return proyect;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    // Skill
    getSkillByUser: async (_, args, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        // console.log(userId);
        const skills = await servicesDb.getDocumentByUser(
          Skill,
          context.user._id
        );
        if (!skills) {
          return [];
        }
        return skills;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    // user
    getUserByIdAbout: async (_, args, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        // console.log(userId);
        const user = await servicesDb.getDocumentByIdUser(
          User,
          context.user._id
        );
        console.log(user, context.user._id);
        if (!user) {
          return [];
        }
        return [user];
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    // Logros
    getLogrosByUser: async (_, args, context) => {
      if (!context.user) {
        throw new ApolloError('I should have a token');
      }
      try {
        // console.log(userId);
        const logros = await servicesDb.getDocumentByUser(
          Logros,
          context.user._id
        );
        if (!logros) {
          return [];
        }
        return logros;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    getProfileUserAbout: async (_, { userName }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByIdUserName(
          AboutMe,
          userName
        );
        if (!aboutMe) {
          return [];
        }
        // console.log(aboutMe);
        return aboutMe;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    getProfileUserProyect: async (_, { userName }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByIdUserName(
          Proyect,
          userName
        );
        if (!aboutMe) {
          return [];
        }
        // console.log(aboutMe);
        return aboutMe;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    getProfileUserSkill: async (_, { userName }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByIdUserName(
          Skill,
          userName
        );
        if (!aboutMe) {
          return [];
        }
        // console.log(aboutMe);
        return aboutMe;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
    getProfileUserLogros: async (_, { userName }) => {
      try {
        // console.log(userId);
        const aboutMe = await servicesDb.getDocumentByIdUserName(
          Logros,
          userName
        );
        if (!aboutMe) {
          return [];
        }
        // console.log(aboutMe);
        return aboutMe;
      } catch (err) {
        // console.Console('');
        return err;
      }
    },
  },
};

module.exports = resolvers;
