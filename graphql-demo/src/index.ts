import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { posts, comments, users } from "./db.js";
import { typeDefs } from "./schema.js";


// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        posts: () => posts,
        comments: () => comments,
        users: () => users,
        user: (parent, args, context) => users.find((user) => user.id == args.id),
        post: (parent, args) => posts.find((post) => post.id == args.id),
        comment: (_, args) => comments.find((c) => c.id == args.id),
    },
    User: {
        posts: (parent) => posts.filter((post) => post.userId == parent.id)
    },
    Post: {
        comments: (parent) => comments.filter((comment) => comment.postId == parent.id),
        user: (parent) => users.find((u) => u.id == parent.userId)
    },
    Comment: {
        post: (parent) => posts.find((p) => p.id == parent.postId)
    },


    Mutation: {
        deletePost: (_, args) => {
            let idx = posts.findIndex((p) => p.id != args.id);
            if (idx >= 0) {
                posts.splice(idx, 1);
                return posts;
            }
            return null;
        },
        deleteComment: (_, args) => {
            let idx = comments.findIndex((c) => c.id == args.id);
            if (idx >= 0) {
                comments.splice(idx, 1);
                return comments;
            }
            return null;
        },
        addPost: (_, args) => {
            let post = {
                ...args.post,
                id: Math.floor(Math.random() * 100000)
            };
            posts.push(post);
            return post;
        },
        addComment: (_, args) => {
            let comment = {
                ...args.comment,
                id: Math.floor(Math.random() * 1000)
            };
            comments.push(comment);
            return comment;
        },
        editPost: (_, args) => {
            let idx = posts.findIndex((p) => p.id == args.id);
            if (idx >= 0) {
                let post = { ...posts[idx], ...args.editData };
                posts.splice(idx, 1, post);
                return post;
            }
            return null;
        },
        editComment: (_, args) => {
            let idx = comments.findIndex((c) => c.id == args.id);
            if (idx >= 0) {
                let comment = { ...comments[idx], ...args.editData };
                comments.splice(idx, 1, comment);
                return comment;
            }
            return null;
        }
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);