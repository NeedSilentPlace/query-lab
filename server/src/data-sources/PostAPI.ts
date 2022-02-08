import { promises } from "fs"
import { DataSource } from "apollo-datasource"

class PostAPI extends DataSource {
  async findAllData() {
    const json = await promises.readFile(__dirname + "/db.json", {
      encoding: "utf-8",
    })

    return JSON.parse(json)
  }

  async findAll() {
    const json = await promises.readFile(__dirname + "/db.json", {
      encoding: "utf-8",
    })
    const { posts } = JSON.parse(json)
    return posts
  }

  async findById(id: number) {
    const posts = await this.findAll()

    return posts.find((post) => post.id === id)
  }

  async updateById(id: number, post: any) {
    const { posts, books } = await this.findAllData()
    const index = posts.findIndex((post) => post.id === id)
    posts[index] = post

    const json = JSON.stringify({ posts, books })
    await promises.writeFile(__dirname + "/db.json", json)

    return post
  }
}

export default PostAPI
