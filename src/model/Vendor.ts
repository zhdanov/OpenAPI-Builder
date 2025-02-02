import JavaWorker from './Bridge/ToJava/JavaWorker'
import { EmitterType, EventEnum } from './Entity/Event'
import Project from './Entity/Project'
import { SideBarManager } from './Entity/SideBar'
import Factory from './Service/Factory'
import ReferenceFinder from './Service/ReferenceFinder'

export default class Vendor {
    private _data: Project
    private _preset: Project
    private _project: Project

    readonly sbManager = new SideBarManager()

    constructor(
        data: Project,
        readonly worker: JavaWorker,
        readonly emitter: EmitterType,
    ) {
        this._data = data
        this._preset = new Project()
        this._project = this._preset
    }

    createProject() {
        const project = new Project()
        project.load(this.data)
        this.project = project
    }

    get data(): Project {
        return this._data
    }

    setData(data: Project) {
        this._data = data
        this._preset = new Project()
        this._preset.load(data)
        this._project = this._preset
    }

    get preset(): Project {
        return this._preset
    }

    get project(): Project {
        return this._project
    }

    set project(project: Project) {
        this._project = project
        this.sbManager.bind(this.project)
        this.emitter.emit(EventEnum.ready)
    }

    get callbackManager() {
        return this.project.oapi.component.callbackManager
    }

    get encodingManager() {
        return this.project.oapi.encodingManager
    }

    get enumerManager() {
        return this.project.oapi.enumerManager
    }

    get exampleManager() {
        return this.project.oapi.component.exampleManager
    }

    get factory() {
        return new Factory(this.project)
    }

    get fieldManager() {
        return this.project.oapi.fieldManager
    }

    get finder() {
        return new ReferenceFinder(this.project)
    }

    get headerManager() {
        return this.project.oapi.component.headerManager
    }

    get parameterManager() {
        return this.project.oapi.component.parameterManager
    }

    get pathManager() {
        return this.project.oapi.pathManager
    }

    get requestBodyManager() {
        return this.project.oapi.component.requestBodyManager
    }

    get responseManager() {
        return this.project.oapi.component.responseManager
    }

    get schemaManager() {
        return this.project.oapi.component.schemaManager
    }

    get scopeManager() {
        return this.project.oapi.scopeManager
    }

    get securityRequirementManager() {
        return this.project.oapi.securityManager
    }

    get securitySchemeManager() {
        return this.project.oapi.component.securitySchemeManager
    }

    get serverManager() {
        return this.project.oapi.serverManager
    }

    get serverVariableManager() {
        return this.project.oapi.serverVariableManager
    }

    get tagManager() {
        return this.project.oapi.tagManager
    }
}
