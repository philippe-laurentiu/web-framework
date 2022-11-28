import { User } from './models/User'

const data = {
  id: 1,
  name: 'hase',
  age: 24
}

const user = new User(data)

user.on('hase', () => {
  console.log('tada')
})

user.trigger('hase')
