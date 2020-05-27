import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { ServerVariableManager } from "./ServerVariable"

export default class Server extends UniqueItem {
    description: string = ''
    readonly variableManager = new ServerVariableManager

    get url() {
        return this.name
    }

    set url(name: string) {
        this.name = name
    }

    toAPI() {
        return {
            url: this.url,
            description: this.description,
            variables: this.variableManager.toAPI()
        }
    }
}

export class ServerManager extends UniqueList<Server> {

    constructor() {
        super(Server)
    }

    toAPI() {
        return this.list.map(item => item.toAPI())
    }
}
