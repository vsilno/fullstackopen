const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const User = require('./models/User')
const Book = require('./models/Book')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => await Book.countDocuments({}),
      authorCount: async () => await Author.countDocuments({}),
      allBooks: async (root, args) => {
          let allBooks = await Book.find({}).populate('author')
          
          if (args.author) {allBooks = allBooks.filter(b => b.author.name === args.author)}
          if (args.genre) {allBooks = allBooks.filter(b => b.genres.includes(args.genre))}
          
          return allBooks
      },
      allAuthors: async () => {
        const authors = await Author.find({}).populate('books')
  
        return authors
      },
  
      me: async (root, args, {currentUser}) => {
        return currentUser
      }
    },
  
    Author: {
      bookCount: async (root) => {
        return root.books.length
      }
    },
  
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'FORBIDDEN',
            }
          })
        }
        
        try {
          let author = await Author.findOne({ name: args.author });
      
          if (!author) {
            author = new Author({ name: args.author });
          }
          
          const book = new Book({ ...args, author: author });
          await book.save()
          await author.save()

          await Author.updateOne({ _id: author.id }, { books: author.books.concat(book.id)})

          pubsub.publish('BOOK_ADDED', { bookAdded: book });
          
          return book;
        } catch (e) {
          throw new GraphQLError('Error adding book', {
            extensions: {
              code: 'BAD_USER_INPUT',
              error: e.message,
            },
          });
        }
      },
  
      editAuthor: async (root, args, {currentUser}) => {
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'FORBIDDEN',
            }
          })
        }
  
        const query = { name: args.name }
        
        try {
          const update = await Author.findOneAndUpdate(query, 
                                { born: args.year }, { runValidators: true, returnDocument: 'after' })
          return update
        } catch (e) {
          throw new GraphQLError('updating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              e
            }
          })
        }
      },
  
      createUser: async (root, args) => {
        const user = new User({...args})
  
        try {
          return user.save()
        } catch (e) {
          throw new GraphQLError('creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              e
            }
          })
        }
      },
  
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'passw' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    }
  }

module.exports = resolvers