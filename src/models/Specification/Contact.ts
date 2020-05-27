import Item from "../Base/Item"

export default class Contact extends Item {
    name: string = ''
    url: string = ''
    email: string = ''

    toAPI() {
        if (this.email.length) {
            return this
        }

        return {
            name: this.name,
            url: this.url,
        }
    }
}
