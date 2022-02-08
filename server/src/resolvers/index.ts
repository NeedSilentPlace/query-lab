import { bookQueries } from "./book"
import { postQueries, postMutations } from "./post"

const resolvers = {
  Query: {
    ...bookQueries,
    ...postQueries,
  },
  Mutation: {
    ...postMutations,
  },
}

export default resolvers
