import Item from "../Base/Item"

export default class License extends Item {
    name: string = ''
    url: string = ''

    toAPI() {
        return this
    }
}
