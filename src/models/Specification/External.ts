import Item from "../Base/Item"

export default class External extends Item {
    description: string = ''
    url: string = ''

    toAPI() {
        return this
    }
}
