import { filter } from '../Service/Text'
import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import Project from './Project'

export default class SideBar {
    readonly manager: UniqueItemManager<UniqueItem> | null = null

    item: UniqueItem | null = null
    keyword = ''
    title: string

    constructor(title: string, manager: UniqueItemManager<UniqueItem>) {
        this.title = title
        this.manager = manager
    }

    get list() {
        if (!this.manager) {
            return []
        }

        if (this.keyword) {
            return filter(this.keyword, this.manager.list)
        }
        return this.manager.list
    }
}

export enum SideBarEnum {
    Example = 'Example',
    Header = 'Header',
    Parameter = 'Parameter',
    Preset = 'Preset',
    Request = 'Request',
    Response = 'Response',
    Schema = 'Schema',
}

export class SideBarManager {
    readonly map = new Map<SideBarEnum, SideBar>()

    bind(project: Project) {
        this.map.set(SideBarEnum.Preset, new SideBar(SideBarEnum.Preset, project.presetManager))

        this.map.set(
            SideBarEnum.Example,
            new SideBar(SideBarEnum.Example, project.oapi.component.exampleManager),
        )
        this.map.set(
            SideBarEnum.Header,
            new SideBar(SideBarEnum.Header, project.oapi.component.headerManager),
        )
        this.map.set(
            SideBarEnum.Parameter,
            new SideBar(SideBarEnum.Parameter, project.oapi.component.parameterManager),
        )
        this.map.set(
            SideBarEnum.Request,
            new SideBar(SideBarEnum.Request, project.oapi.component.requestBodyManager),
        )
        this.map.set(
            SideBarEnum.Response,
            new SideBar(SideBarEnum.Response, project.oapi.component.responseManager),
        )
        this.map.set(
            SideBarEnum.Schema,
            new SideBar(SideBarEnum.Schema, project.oapi.component.schemaManager),
        )
    }
    get(name: SideBarEnum) {
        const sb = this.map.get(name)
        if (sb) {
            return sb
        }
        throw new Error(`SideBar ${name} not found!`)
    }
}