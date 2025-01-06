const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MONGODB");
  })
  .catch((err) => console.log("error connection", err.message));

const typeDefs = `
  type Book {
    title: String
    author: Author!
    published: Int
    genres: [String]
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }
    
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(title: String): [Book!]
    allAuthors : [Author!]
    allUsers: [User!]
    me: User
  }
  
  type Mutation {
    addBook (
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book

    addAuthor (
      name: String!
      born: Int
    ): Author

    editAuthor (
      name: String!
      setBornTo: Int
    ): Author

    createUser(username: String!) : User
    login(username: String! password: String!): Token!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!args.title) {
        return Book.find({});
      }
      return await Book.find({ title: args.title });
    },

    allAuthors: async () => await Author.find({}),

    allUsers: async () => await User.find({}),

    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: (root) => {
      return Book.find({});
    },
  },

  Book: {
    author: ({ name, born }) => {
      return {
        name,
        born,
      };
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      await book.save();
      return book;
    },

    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated");
      }

      const author = new Author({ ...args });
      return await author.save();
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      console.log("found", author);

      if (!author) {
        console.log("not found author");
        return null;
      }

      author.born = args.setBornTo;
      await author.save();
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return await user.save();
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
