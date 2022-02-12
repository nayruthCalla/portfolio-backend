/* eslint-disable */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Custom types
  "✅ user role if admin is true if not false"
  type RolUser {
    "The admin field is boolean type can be false or true"
    admin: Boolean # returns a Boolean,
  }

  "✅ Is the user's social network"
  type SocialNetwork {
    "social network name"
    name: String!
    "social network link"
    link: String!
  }
  "✅ Is the user's social network"
  input SocialNetworkPost {
    "social network name"
    name: String!
    "social network link"
    link: String!
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

  """
  ✅ the about me has the following fields:
   **userId**, **firstName**, **lastName**, **profession**, **linkUsername**, **aboutMeText**, **myPharse**, **socialNetwork**
  """
  type AboutMe {
    "id: The id is unique for a user and is type string"
    id: String!
    "userId: The userId is unique for a user and is type string"
    userId: String!
    "firstName is the full name of the user, is of type string and cannot be null"
    firstName: String!
    "lastName is the username in the App, is of type string and cannot be null"
    lastName: String!
    "profession: is the user's profession in the application, it is of type string and cannot be null"
    profession: String!
    "linkUsername:is the link of the user's web portfolio, is of type string, if it can be null"
    linkUsername: String!
    "aboutMeText: is the user description, is of type string, if it can be null"
    aboutMeText: String!
    "myPharse: is a phrase that characterizes the user, is of type string, if it can be null"
    myPharse: String!
    "socialNetworks: are the user's social networks, is of type array, if it can be null"
    socialNetworks: [SocialNetwork]
    "photo: photo of the user in the web portfolio, is of type string, if it can be null"
    photo: String!
    "coverImage: cover background image, is of type string, if it can be null"
    coverImage: String!
  }

  # types Mutations

  """
  ✅ Mutation: mutations are to create, update, or delete data
  """
  type Mutation {
    # USER  -----------------------------------------------------------------------
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

    # About Me -----------------------------------------------------------------------
    """
    ✅ Mutation addAboutMe: To add a aboutMe it is important to send the following fields
     **firstName**, **lastName**, **profession**, **linkUsername**, **aboutMeText**.
     **myPharse**, **socialNetworks**, **photo**, **coverImage**,
     The response from addUser is the object created in the database
    """
    addAboutMe(
      "userId: The userId is unique for a user and is type string"
      userId: String!
      "firstName: is the first name of the user, in the web portfolio, is of type string and cannot be null"
      firstName: String!
      "lastName: is the last name of the user, in the web portfolio, is of type string and cannot be null and is unique"
      lastName: String!
      "profession: is the user's profession, is of type string and cannot be null and is unique"
      profession: String!
      "linkUsername:is the link of the user's web portfolio, is of type string, if it can be null"
      linkUsername: String!
      "aboutMeText: is the user description, is of type string, if it can be null"
      aboutMeText: String!
      "myPharse: is a phrase that characterizes the user, is of type string, if it can be null"
      myPharse: String!
      "socialNetworks: are the user's social networks, is of type object, if it can be null"
      socialNetworks: SocialNetworkPost!
      "photo: photo of the user in the web portfolio, is of type string, if it can be null"
      photo: String!
      "coverImage: cover background image, is of type string, if it can be null"
      coverImage: String!
    ): AboutMe!
    # update About me
    """
    ✅ Mutation updateUser: To edit a AboutMe, the **id** field is important, and the fields to edit, which are the following:
     **firstName**, **lastName**, **profession**, **linkUsername**, **aboutMeText**.
     **myPharse**, **socialNetworks**, **photo**, **coverImage**,
    If the edition was correct the answer is the object that is being edited
    """
    updateAboutMe(
      "id: The id is unique for a user and is type string"
      id: String!
      "firstName: is the first name of the user, in the web portfolio, is of type string and cannot be null"
      firstName: String
      "lastName: is the last name of the user, in the web portfolio, is of type string and cannot be null and is unique"
      lastName: String
      "profession: is the user's profession, is of type string and cannot be null and is unique"
      profession: String
      "linkUsername:is the link of the user's web portfolio, is of type string, if it can be null"
      linkUsername: String
      "aboutMeText: is the user description, is of type string, if it can be null"
      aboutMeText: String
      "myPharse: is a phrase that characterizes the user, is of type string, if it can be null"
      myPharse: String
      "socialNetworks: are the user's social networks, is of type object, if it can be null"
      socialNetworks: SocialNetworkPost
      "photo: photo of the user in the web portfolio, is of type string, if it can be null"
      photo: String
      "coverImage: cover background image, is of type string, if it can be null"
      coverImage: String
    ): AboutMe
    # # delete User
    """
    ✅ Mutation deleteAboutMe: To delete a user the important field is the **id**
    If the edition was correct the answer is the object that is being deleted
    """
    deleteAboutMe(
      "id: The id is unique for a user and is type string"
      id: String!
    ): AboutMe
  }

  # types Querys
  """
  ✅ Query : query are to search for data by id or bring all the data referring to a collection:
  **id**,**fullname**, **userName**, **email**, **roles**, **photo**.
  """
  type Query {
    # users
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

    # About Me
    """
    ✅ Query getAboutMeByUser: returns a user object by id, the fields you can select are:
    **userId**, **firstName**, **lastName**, **profession**, **linkUsername**,
     **aboutMeText**, **myPharse**, **socialNetwork**
    """
    getAboutMeByUser(
      "userId: The userId is unique for a user and is type string "
      userId: String!
    ): AboutMe
  }
`;

module.exports = typeDefs;
