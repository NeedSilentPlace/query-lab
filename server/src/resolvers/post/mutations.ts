const postMutations = {
  updatePost: async (_, { input }, { dataSources }) => {
    const post = await dataSources.postAPI.updateById(input.id, input)
    return post
  },
}

export default postMutations
