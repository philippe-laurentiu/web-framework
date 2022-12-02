import { User } from './models/User'

const data = {
  id: 1,
  name: 'hasi',
  age: 24,
}


const user = new User(data)

user.on('change', () => {
  console.log(user)
})

user.save()
