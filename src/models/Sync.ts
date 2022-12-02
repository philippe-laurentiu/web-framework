interface HasId {
  id?: number
}

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): Promise<Response> {
    return fetch(`${this.rootUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // .then((respons) => respons.json)
      // .then((data) => console.log('test'))
  }

  save(data: T): Promise<Response> {
    const { id } = data

    if (id) {
      return fetch(`${this.rootUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow'
      })
        // .then((respons) => respons.json)
        // .then((data) => console.log(data))
    } else {
      return fetch(`${this.rootUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        // .then((respons) => respons.json)
        // .then((data) => console.log(data))
    }
  }
}
