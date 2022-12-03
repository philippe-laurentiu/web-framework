// import { UserEdit } from './views/UserEdit'
import { User, UserProps } from './models/User'
import { CollectionView } from './views/CollectionView'
import { UserList } from './views/UserList'
import { UserEdit } from './views/UserEdit'

const root = document.getElementById('root')

const coll = User.buildUserCollection()
coll.fetch()

if (root) {
  coll.on('change', () => {
    const userList = new UserList(root, coll)
    userList.render()
  })
}

if (root) {
  const user = User.buildUser({
    name: 'hase',
    age: 23,
  })

  const ue = new UserEdit(root, user)

  console.log(ue)
  ue.render()
}
