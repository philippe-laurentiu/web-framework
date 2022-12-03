export interface ModelAttributes<T> {
  get<K extends keyof T>(propName: K): T[K]
  set(update: T): void
  getAll(): T
}

export interface Sync<T> {
  fetch(id: number): Promise<Response>
  save(dat: T): Promise<Response>
}

type callback = () => void
export interface Events {
  on(eventName: string, callback: callback): void
  trigger(eventName: string): void
}

export interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  set(update: T) {
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
      .then((res: T) => this.set(res))
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then(() => {
      this.trigger('save')
    })
  }
}
