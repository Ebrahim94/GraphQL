import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query: Query,
    Mutation: Mutation,
    Post: Post,
    User: User,
    Comment: Comment
  },
  context: {
    db: db
  }
});

server.start(() => {
  console.log('the server is up');
  console.log('Connected to default port: 4000');
});
