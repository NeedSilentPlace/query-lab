const postQueries = {
  posts: async (parent, { input }, { dataSources }) => {
    const { offset, limit } = input
    const posts = await dataSources.postAPI.findAll()

    return posts.slice(offset, offset + limit)
  },
  post: async (parent, { id }, { dataSources }) => {
    const post = await dataSources.postAPI.findById(id)

    return post
  },
}

export default postQueries
