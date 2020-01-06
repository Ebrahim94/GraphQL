const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  comments(parent, args, ctx, info) {
    return db.comments;
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post =>
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
};

export default Query;
