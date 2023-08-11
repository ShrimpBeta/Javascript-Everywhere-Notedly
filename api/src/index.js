// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const models = require("./models");
const jwt = require('jsonwebtoken');
const helemt = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const db = require('./db');

const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;

// let notes = [
//     { id: '1', content: 'This is a note', author: 'Adam Scott' },
//     { id: '2', content: 'This is another note', author: 'Harlow Everly' },
//     { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
// ];

// get the user info from a JWT
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};


// const resolvers = {
//     Query: {
//         hello: () => 'Hello world!',
//         notes: async () => {
//             return await models.Note.find();
//         },
//         note: async (parent, args) => {
//             return await models.Note.findById(args.id);
//         }
//     },
//     Mutation: {
//         newNote: async (parent, args) => {
//             return await models.Note.create({
//                 content: args.content,
//                 author: 'Adam Scott'
//             });
//         }
//     }
// };

const app = express();
app.use(helemt());
app.use(cors());

db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization;
        // try to retrieve a user with the token
        const user = getUser(token);
        // Add the db models to the context
        // console.log(user)
        return { models, user };
    }
});

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => {
//     res.send('Hello World!!!!')
// });

app.listen(port, () => {
    // console.log(`Server running at http://localhost:${port}`)
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
});