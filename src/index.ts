import { Collection } from "./models/Collection";

const coll = new Collection('http://localhost:3000/users')

coll.on('change', () => {
  console.log(coll)
})

coll.fetch()