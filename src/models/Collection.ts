import { Eventing } from './Eventing'

export class Collection<T, K> {
  models: T[] = []
  eventing: Eventing = new Eventing()

  constructor(public rootUrl: string, public deserialise: (json: K) => T) {}

  get on() {
    return this.eventing.on
  }

  get trigger() {
    return this.eventing.trigger
  }

  fetch(): void {
    fetch(this.rootUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((data: K) => {
          this.models.push(this.deserialise(data))
        })
        this.trigger('change')
      })
  }
}
