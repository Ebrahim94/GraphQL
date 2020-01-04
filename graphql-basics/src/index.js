import { GraphQLServer } from 'graphql-yoga';

// Type definition (Schema)
const typeDefs = `
type Query {
    greeting(name: String, position: String): String!
   post: Post!
   add(a: Float!, b: Float!): Float!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
}
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello ${args.name} you are my favorite ${args.position}`;
      }
      return 'Insert a name and positon please';
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
    post() {
      return {
        id: 'abcd',
        title: 'How to grow a beard in 7 days',
        body: 'This is my body',
        published: true
      };
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('the server is up');
  console.log('Connected to default port: 4000');
});
