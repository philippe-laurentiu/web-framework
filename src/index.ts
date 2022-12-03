import { UserForm } from "./views/UserForm"
import { User } from "./models/User"

const root = document.getElementById('root')

if (root) {
  const user = User.buildUser({
    id: 1,
    name: 'hase',
    age: 23
  })
  const uf = new UserForm(
    root,
    user
  )
  uf.render()
}
