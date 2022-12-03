import { User } from "../models/User"

export class UserForm {
    constructor(public parent: Element, public user: User){
        this.test()
    }

    test(): void {
        this.user.on('change', () => {
            this.render()
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.rand-age': this.onRandomAge,
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
                <button class="rand-age">Random Age</button>
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