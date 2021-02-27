import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { OperationManager } from './Operation'
import { ParameterManager, Location } from './Parameter'

export default class Path extends SideBarItem {
    description = ''
    summary = ''

    readonly operationManager = new OperationManager(this)
    readonly parameterManager = new ParameterManager(Location.path)

    toOAPI() {
        return this.operationManager.toOAPI()
    }
}

export class PathManager extends UniqueItemManager<Path> {
    constructor() {
        super(Path)
    }
}
