import { UserEdit } from './views/UserEdit'
import { User } from './models/User'

const root = document.getElementById('root')

if (root) {
  const user = User.buildUser({
    name: 'hase',
    age: 23,
  })

  const ue = new UserEdit(root, user)

  console.log(ue)
  ue.render()
}
