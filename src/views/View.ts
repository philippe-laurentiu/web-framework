import { HasId, Model } from '../models/Model'

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {}
  abstract template(): string

  constructor(public parent: Element, public model: T) {
    this.changeListener()
  }

  eventsMap(): { [key: string]: () => void } {
    return {}
  }

  regionsMap(): { [key: string]: string } {
    return {}
  }

  changeListener(): void {
    this.model.on('change', () => {
      this.render()
    })
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    for (let eventKey in eventsMap) {
      const [eventName, eventSelector] = eventKey.split(':')
      fragment.querySelectorAll(eventSelector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap()

    for (let key in regionsMap) {
      const selector = regionsMap[key]
      const element = fragment.querySelector(selector)

      if (element) {
        this.regions[key] = element
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.mapRegions(templateElement.content)
    this.onRender()
    this.parent.append(templateElement.content)
  }
}
