import { User } from "./models/User"

console.log('hi there')

const user = new User({name: 'hase', age: 36})
user.set({age: 23})
console.log(user.get('age'));

