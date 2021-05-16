const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type UserDetails {
        id: ID!
        name: String!
        occupation: String
        email: String
        website: String
        isProfilePictureAvailable: Boolean!
        profilePictureExtension: String
    }

    type Query {
        getUserDetails(id: ID!): UserDetails!
        getStoryCaption(id: ID!): String!
        hello: String!
    }

    type Mutation {
        addUser(
            name: String!
            occupation: String
            email: String
            website: String
        ): UserDetails!

        addStoryCaption(
            id: ID!
            caption: String!): ID

        removeProfilePicture(id: ID!): ID
    }
`;

module.exports = typeDefs;
