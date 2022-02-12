// const User = require('./user.model');
module.exports = () => ({
  existsUserById: async (model, userId) => {
    await model.exists({ _id: userId });
  },
  existsByEmail: async (model, email) => {
    try {
      const userExists = await model.exists({ email });
      if (userExists) {
        return 'null';
      }
      return userExists;
    } catch (err) {
      return err;
    }
  },
  existsByUsername: async (model, userName) => {
    try {
      const userExists = await model.exists({ userName });
      if (userExists) {
        return 'null';
      }
      return userExists;
    } catch (err) {
      return err;
    }
  },
  createDocument: async (model, data) => {
    console.log('crear', data);
    try {
      console.log('try crear', data);
      const newCollection = new model(data);
      const savedCollection = await newCollection.save();
      console.log(savedCollection);
      return savedCollection;
    } catch (err) {
      console.log('elorr', err);
      return err;
    }
  },
  getDocumentById: async (model, id) => {
    try {
      const userById = await model.findById(id);
      return userById;
    } catch (err) {
      return err;
    }
  },
  getDocumentByUser: async (model, userId) => {
    try {
      const getByUser = await model.find({ userId: userId });
      console.log(getByUser[0]);
      return getByUser[0];
    } catch (err) {
      console.log('elorr', err);
      return err;
    }
  },
  getAllDocument: async (model) => {
    try {
      const documents = await model.find();
      return documents;
    } catch (err) {
      return err;
    }
  },
  updateDocument: async (model, id, data) => {
    try {
      const updatedDocument = await model.findByIdAndUpdate(id, data);
      return updatedDocument;
    } catch (err) {
      return null;
    }
  },
  deleteDocument: async (model, id) => {
    try {
      const deletedDocument = await model.findByIdAndDelete(id);
      return deletedDocument;
    } catch (err) {
      return null;
    }
  },
});
