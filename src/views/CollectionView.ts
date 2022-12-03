import { Collection } from '../models/Collection'

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  renderItem(model: T, itemParent: DocumentFragment): void {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.itemTemplate(model)
    itemParent.append(templateElement.content)
  }

  itemTemplate(model: T): string {
    return ``
  }

  render(): void {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    this.collection.models.forEach((model) => {
      this.renderItem(model, templateElement.content)
    })
    this.parent.append(templateElement.content)
  }
}
