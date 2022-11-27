interface UserProps {
  id?: number
  name?: string
  age?: number
}

type callback = () => void

export class User {
  events: { [key: string]: callback[] } = {}

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName]
  }

  set(update: UserProps): void {
    Object.assign(this.data, update)
  }

  on(eventName: string, callback: callback) {
    let handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger(eventName: string): void {
    let handlers = this.events[eventName]

    if (!handlers || handlers.length === 0) {
      return
    }

    handlers.forEach((callback) => {
      callback()
    })
  }

  fetch(): void {
    fetch(`http://localhost:3000/users/${this.get('id')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((respons) => respons.json)
      .then((data) => console.log('test'))
  }

  save(): void {
    const id = this.get('id')

    if (id) {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUTS',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.data)
      })
        .then((respons) => respons.json)
        .then((data) => console.log(data))
    } else {
      fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.data)
      })
        .then((respons) => respons.json)
        .then((data) => console.log(data))
    }
  }
}
