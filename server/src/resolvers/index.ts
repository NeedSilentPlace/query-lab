import { bookQueries, bookMutations } from "./book"
import { postQueries, postMutations } from "./post"

const resolvers = {
  Query: {
    ...bookQueries,
    ...postQueries,
  },
  Mutation: {
    ...postMutations,
    ...bookMutations,
  },
}

export default resolvers
