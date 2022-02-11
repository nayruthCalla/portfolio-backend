/* eslint-disable */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Custom types
  "user role if admin is true if not false"
  type RolUser {
    "The admin field is boolean type can be false or true"
    admin: Boolean # returns a Boolean,
  }

  """
  ✅ The user has the fields of **id**, **fullname**, **userName**, **email**, **roles**, **photo**
  """
  type User {
    "id: The id is unique for a user and is type string"
    id: String!
    "fullName is the full name of the user, is of type string and cannot be null"
    fullName: String!
    "username is the username in the App, is of type string and cannot be null and is unique"
    userName: String!
    "email is the user's email in the App, is of type string and cannot be null and is unique"
    email: String!
    "roles is the role that the user has in the App, is of object type and cannot be null, it has admin as property and this property is a boolean type"
    roles: RolUser!
    "photo is the profile photo of the user in the App, is of type string, if it can be null"
    photo: String
  }

  # types Mutations

  """
  ✅ Mutation addUser: To add a user it is important to send the following fields
   **fullname**, **userName**, **email**, **roles**, **photo**.
   The response from addUser is the object created in the database
  """
  type Mutation {
    """
    ✅ Mutation addUser: To add a user it is important to send the following fields
     **fullname**, **userName**, **email**, **roles**, **photo**.
     The response from addUser is the object created in the database
    """
    addUser(
      "fullName is the full name of the user, is of type string and cannot be null"
      fullName: String!
      "userName is the username in the App, is of type string and cannot be null and is unique"
      userName: String!
      "email is the user's email in the App, is of type string and cannot be null and is unique"
      email: String!
      "photo is the profile photo of the user in the App, is of type string, if it can be null"
      photo: String
    ): User!
    # update User
    """
    ✅ Mutation updateUser: To edit a user, the **id** field is important, and the fields to edit, which are the following:
    **userName**, **email**, **roles**, **photo**.
    If the edition was correct the answer is the object that is being edited
    """
    updateUser(
      "id: The id is unique for a user and is type string"
      id: String!
      "fullName is the full name of the user, is of type string"
      fullName: String
      "userName is the username in the App, is of type string and cannot be null and is unique"
      userName: String
      "email is the user's email in the App, is of type string and cannot be null and is unique"
      email: String
      "photo is the profile photo of the user in the App, is of type string, if it can be null"
      photo: String
    ): User
    # delete User
    """
    ✅ Mutation deleteUser: To delete a user the important field is the **id**
    If the edition was correct the answer is the object that is being deleted
    """
    deleteUser(
      "id: The id is unique for a user and is type string"
      id: String!
    ): User
  }

  # types Querys
  """
  ✅ Query getUsers: returns an array of users the fields you can select are:
  **id**,**fullname**, **userName**, **email**, **roles**, **photo**.
  """
  type Query {
    """
    ✅ Query getUsers: returns an array of users the fields you can select are:
    **id**,**fullname**, **userName**, **email**, **roles**, **photo**.
    """
    getUsers: [User] # This user type has six fields: id, fullname, username, email, roles, photo
    """
    ✅ Query getUserById: returns a user object by id, the fields you can select are:
    **id**,**fullname**, **userName**, **email**, **roles**, **photo**.
    """
    getUserById(
      "id: The id is unique for a user and is type string"
      id: String!
    ): User
  }
`;

module.exports = typeDefs;
