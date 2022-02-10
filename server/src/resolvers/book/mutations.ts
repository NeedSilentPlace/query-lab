const bookMutations = {
  updateBook: async (_, { input }, { dataSources }) => {
    const book = await dataSources.bookAPI.updateById(input.id, input)

    return book
  },
}

export default bookMutations
