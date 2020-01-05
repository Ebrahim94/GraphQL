import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Dummy Comment Data
const comments = [
  {
    id: '1',
    text: 'Dude that is so cool',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'I would like it if I were there with you',
    author: '3',
    post: '3'
  },
  {
    id: '3',
    text: 'Awwww',
    author: '3',
    post: '2'
  },
  {
    id: '4',
    text: 'Nice picture',
    author: '2',
    post: '1'
  }
];

// Dummy User Data
const users = [
  {
    id: '1',
    name: 'Ebrahim',
    age: 25,
    email: 'ebrahim994a@gmail.com'
  },
  {
    id: '2',
    name: 'Maxine',
    age: 33,
    email: 'maxine@gmail.com'
  },
  {
    id: '3',
    name: 'Example',
    age: 22,
    email: 'example@gmail.com'
  }
];

//Dummy Post Data
const posts = [
  {
    id: '1',
    title: 'How to do how to tutorials',
    body: 'there is no wrong way',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Is she/he thinking about someone else',
    body: 'Do I look like a psychic to you?',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'Three ways to talk to someone you just met',
    body: 'You tell me!',
    published: true,
    author: '3'
  }
];

// Type definition (Schema)
const typeDefs = `
type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
   post: Post!
   me: User!
   comments: [Comment!]!
}

type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body:String!, published: Boolean!, author: ID!): Post!
    createComment(text:String!, author:ID!, post:ID! ): Comment!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]
}

type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
}
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post =>
        post.title.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    post() {
      return {
        id: 'abcd',
        title: 'How to grow a beard in 7 days',
        body: 'This is my body',
        published: true
      };
    },
    me() {
      return {
        id: 'abcd',
        age: 25,
        name: 'Ebrahim',
        email: 'ebrahim994a@gmail.com'
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email);

      if (emailTaken) {
        throw new Error('Email taken');
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: true,
        author: args.author
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);
      const postExists = posts.some(post => post.id === args.post);

      if (!userExists) {
        throw new Error('User does not exist');
      }

      if (!postExists) {
        throw new Error('Post no longer exists');
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post
      };

      comments.push(comment);

      return comment;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, crx, info) {
      return posts.find(post => post.id === parent.post);
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
