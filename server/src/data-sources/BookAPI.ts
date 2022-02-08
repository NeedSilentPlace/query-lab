import { promises } from "fs"
import { DataSource } from "apollo-datasource"

class BookAPI extends DataSource {
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
}

export default BookAPI
