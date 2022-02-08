import { ApolloServer } from "apollo-server"
import "graphql-import-node"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import PostAPI from "./data-sources/PostAPI"
import BookAPI from "./data-sources/BookAPI"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      postAPI: new PostAPI(),
      bookAPI: new BookAPI(),
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
