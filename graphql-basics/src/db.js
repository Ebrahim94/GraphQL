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

const db = {
  users,
  posts,
  comments
};

export default db;
