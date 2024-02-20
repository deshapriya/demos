export const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This types defines the queryable fields for every tables/objects in our data source.

type Post {
    userId: ID!
    id: ID!
    title: String!
    body: String
    comments: [Comment!]
    user: User!
}

type Comment {
    postId: ID!
    id: ID!
    name: String!
    email: String!
    body: String
    post: Post!
}

type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String
    address: Address
    company: Company
    posts: [Post!]
}

type Address {
    street: String
    suite: String
    city: String
    zipcode: String!
    geo: Geo
}

type Geo {
    lat: String
    lng: String
}

type Company {
    name: String
    catchPhrase: String
    bs: String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    posts: [Post]
    comments: [Comment]
    users: [User]
    user(id: ID!): User
    post(id: ID!): Post
    comment(id: ID!): Comment
}

type Mutation {
    deletePost(id: ID!): [Post],
    deleteComment(id: ID!): [Comment],
    addPost(post: AddPostInput!): Post,
    addComment(comment: AddCommentInput!): Comment,
    editPost(id: ID!, editData: EditPostInput!): Post,
    editComment(id: ID!, editData: EditCommentInput!): Comment
}

input AddPostInput {
    userId: ID!
    title: String!
    body: String
}

input AddCommentInput {
    postId: ID!
    name: String!
    email: String!
    body: String
}
input EditPostInput {
    title: String
    body: String
}

input EditCommentInput {
    name: String
    email: String
    body: String
}

`;