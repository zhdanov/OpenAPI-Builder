import Item from '../Entity/Item'
import Component from './Component'
import External from './External'
import Info from './Info'
import { PathManager } from './Path'
import { ReferenceType } from './Reference'
import { SecurityRequirementManager } from './SecurityRequirement'
import { ServerManager } from './Server'
import { TagManager } from './Tag'

const Version = '3.1.0'

export default class Document extends Item {
    readonly component = new Component()
    readonly externalDocs = new External()
    readonly info = new Info()
    readonly pathManager = new PathManager()
    readonly securityManager = new SecurityRequirementManager()
    readonly serverManager = new ServerManager()
    readonly tagManager = new TagManager()

    getManager(type: ReferenceType) {
        switch (type) {
            case ReferenceType.examples:
                return this.component.exampleManager

            case ReferenceType.headers:
                return this.component.headerManager

            case ReferenceType.parameters:
                return this.component.parameterManager

            case ReferenceType.requestBodies:
                return this.component.requestBodyManager

            case ReferenceType.responses:
                return this.component.responseManager

            case ReferenceType.schemas:
                return this.component.schemaManager

            case ReferenceType.security:
                return this.component.securitySchemeManager

            default:
                break
        }
        throw new Error('Unknown ReferenceType: ' + type)
    }

    toOAPI() {
        return {
            openapi: Version,
            info: this.info.toOAPI(),
            components: this.component.toOAPI(),
            paths: this.pathManager.toOAPI(),
            security: this.securityManager.toOAPIArray(),
            servers: this.serverManager.toOAPIArray(),
            tags: this.tagManager.toOAPIArray(),
            externalDocs: this.externalDocs.toOAPI(),
        }
    }
}