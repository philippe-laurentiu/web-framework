interface UserProps {
  name?: string
  age?: number
}

type callback = () => void

export class User {
  events: {[key: string]: callback[] } = {}
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

    if(!handlers || handlers.length === 0){
      return
    }

    handlers.forEach(callback => {
      callback()
    })
  }
}
