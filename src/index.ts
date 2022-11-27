import { User } from './models/User'


const data = {
  id: 1,
  name: 'hase',
  age: 24
}

const user = new User(data)
user.fetch()

// fetch('http://localhost:3000/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// }).then((respons) => respons.json).then((data) => console.log(data))