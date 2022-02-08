const bookQueries = {
  books: async (parent, { input }, { dataSources }) => {
    const { offset, limit } = input
    const books = await dataSources.bookAPI.findAll()

    return books.slice(offset, offset + limit)
  },
  book: async (parent, { id }, { dataSources }) => {
    const book = await dataSources.bookAPI.findById(id)

    return book
  },
}

export default bookQueries
