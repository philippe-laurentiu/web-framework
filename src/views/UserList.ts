import { User, UserProps } from '../models/User'
import { CollectionView } from './CollectionView'

export class UserList extends CollectionView<User, UserProps> {
  itemTemplate(model: User): string {
    return `
            <li>Name: ${model.get('name')} Age:${model.get('age')}</li>
        `
  }
}
