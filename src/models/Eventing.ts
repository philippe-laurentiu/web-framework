type callback = () => void

export class Eventing {
  events: { [key: string]: callback[] } = {} 

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
}