import { User, UserProps } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onRandomAge,
      'click:.set-name': this.onSetName,
      'click:.save-user': this.onSaveUser,
    }
  }

  template(): string {
    return `
            <div>
                <input placeholder="${this.model.get('name')}"/> 
                <button class="set-name">Set Name</button>
                <button class="set-age">Random Age</button>
                <button class="save-user">Save</button>
            </div>
        `
  }

  onSetName = () => {
    const element = this.parent.querySelector('input')
    if (element) {
      this.model.set({ name: element.value })
    }
  }

  onRandomAge = () => {
    this.model.setRandomAge()
  }

  onSaveUser = () => {
    this.model.save()
  }
}
