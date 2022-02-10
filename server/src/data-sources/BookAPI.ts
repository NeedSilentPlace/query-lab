import { promises } from "fs"
import { DataSource } from "apollo-datasource"

class BookAPI extends DataSource {
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
    const { books } = JSON.parse(json)
    return books
  }

  async findById(id: number) {
    const books = await this.findAll()

    return books.find((book) => book.id === id)
  }

  async updateById(id: number, book: any) {
    const { posts, books } = await this.findAllData()
    const index = books.findIndex((book) => book.id === id)
    books[index] = book

    const json = JSON.stringify({ posts, books })
    await promises.writeFile(__dirname + "/db.json", json)

    return book
  }
}

export default BookAPI
