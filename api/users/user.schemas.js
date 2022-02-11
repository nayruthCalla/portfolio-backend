/* eslint-disable */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  "Description for the type"
  type rol {
    admin: Boolean # returns a Boolean,
  }
  type user {
    """
    Description for field
    Supports **multi-line** description for your [API](http://example.com)!
    """
    # This user type has six fields: id, fullname, username, email, roles, photo
    id: String # returns a String
    fullname: String # returns a String
    username: String # returns a String,
    email: String # returns a String,
    roles: rol # returns a Object,
    photo: String # returns a String
  }
  type Query {
    users: [user] # This user type has six fields: id, fullname, username, email, roles, photo
  }
  type Mutation {
    addUser(fullname: String, username: String, email: String): user
  }
`;

module.exports = typeDefs;
