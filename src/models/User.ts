import { Attributes } from './Attributes'
import { Eventing } from './Eventing'
import { Sync } from './Sync'
export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
  events: Eventing = new Eventing()
  sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
  attributes: Attributes<UserProps>

  constructor(private attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  set(update: UserProps) {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  fetch(): void {
    const id = this.attributes.get('id')

    if (typeof id !== 'number') {
      throw new Error('Error: unabel to fetch')
    }

    this.sync
      .fetch(id)
      .then((respones: Response) => {
        return respones.json()
      })
      .then((res: UserProps) => this.set(res))
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then(() => {
      this.trigger('save')
    })
  }
}
