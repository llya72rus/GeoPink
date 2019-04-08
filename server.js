const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
require('dotenv').config();
const { findOrCreateUser } = require('./controllers/userController');

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(() => console.log('DB is connected!'))
.catch(e => console.log('ошибка', e))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if(authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.error(`Unable to authenticate user with token ${authToken}`)
    }
    return { currentUser };
  }
});

server.listen().then(({url}) => {
  console.log(`server is listening on ${url}`)
});