import { User } from "../models/User"

export class UserForm {
    constructor(public parent: Element, public user: User){
        this.changeListener()
    }

    changeListener(): void {
        this.user.on('change', () => {
            this.render()
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onRandomAge,
            'click:.set-name': this.onSetName
            // 'mouseenter:p':  this.onMouseEnter
        }
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap()

        for(let eventKey in eventsMap) {
            const [eventName, eventSelector] = eventKey.split(':')
            fragment.querySelectorAll(eventSelector).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }

    onSetName = () => {
        const element = this.parent.querySelector('input')
        if (element) {
            this.user.set({name: element.value})
        }

    }

    onRandomAge = () => {
        this.user.setRandomAge()
    }

    template(): string {
        return `
            <div>
                <p>test</p>
                <div>${this.user.get('name')}</div>
                <div>${this.user.get('age')}</div>
                <input /> 
                <button class="set-name">Set Name</button>
                <button class="set-age">Random Age</button>
            </div>
        `
    }

    render(): void {
        this.parent.innerHTML = ''
        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template()
        this.bindEvents(templateElement.content)
        this.parent.append(templateElement.content)
    }
}