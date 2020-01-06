import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email taken');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    let userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User does not exist');
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = posts.filter(post => {
      const match = post.author === args.id;

      // deleting all the comments on the post
      if (match) {
        comments = comments.filter(comment => comment.post !== post.id);
      }

      //return true if it is not match ~ keep in list
      return !match;
    });

    // delete all the comments made by the author
    comments = db.comments.filter(comment => comment.author !== args.id);

    return deletedUsers[0];
  },
  deleteComment(parent, args, { db }, info) {
    let commentIndex = db.comments.findIndex(comment => comment.id === args.id);

    if (commentIndex === -1) {
      throw new Error('Comment no longer exists');
    }

    let deletedComment = db.comments.splice(commentIndex, 1);
    return deletedComment[0];
  },
  deletePost(parent, args, ctx, info) {
    let postIndex = db.posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post is not found');
    }

    const deletedPost = db.posts.splice(postIndex, 1);

    comments = db.comments.filter(comment => comment.post !== args.id);

    return deletedPost[0];
  },
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const post = {
      id: uuidv4(),
      ...args.data
    };

    db.posts.push(post);

    return post;
  },
  createComment(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);
    const postExists = db.posts.some(post => post.id === args.data.post);

    if (!userExists) {
      throw new Error('User does not exist');
    }

    if (!postExists) {
      throw new Error('Post no longer exists');
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    };

    db.comments.push(comment);

    return comment;
  }
};

export default Mutation;
