import { Eventing } from './Eventing'
import { User, UserProps } from './User'
export class Collection {
    models: User[] = []
    eventing: Eventing = new Eventing()

    constructor(public rootUrl: string){}

    get on() {
        return this.eventing.on
    }

    get trigger() {
        return this.eventing.trigger
    }

    fetch(): void {
        fetch(this.rootUrl,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => response.json()).then((response) => {
            response.forEach((userData: UserProps) => {
                const user = User.buildUser(userData)
                this.models.push(user)
            });
            this.trigger('change')
        })
    }
}