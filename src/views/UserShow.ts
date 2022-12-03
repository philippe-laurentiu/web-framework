import { User, UserProps } from '../models/User'
import { View } from './View'

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
            <div>
                <h2>User Details</h2>
                <div>UserName: ${this.model.get('name')}</div>
                <div>UserAge: ${this.model.get('age')}</div>
            </div>
        `
  }
}
