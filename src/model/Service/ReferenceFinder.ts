import ProjectInterface from '../Entity/ProjectInterface'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItemInterface from '../Entity/UniqueItemInterface'
import UniqueItemManagerInterface from '../Entity/UniqueItemManagerInterface'
import Reference from '../OAPI/Reference'
import Schema from '../OAPI/Schema'
import TargetType from '../OAPI/TargetType'
import SchemaFieldFinder from './SchemaFieldFinder'

export default class ReferenceFinder implements ReferenceFinderInterface {
    readonly schemaFieldFinder

    constructor(readonly project: ProjectInterface) {
        this.schemaFieldFinder = new SchemaFieldFinder(
            project.oapi.fieldManager,
            project.oapi.component.schemaManager,
        )
    }

    find<T extends UniqueItemInterface>(reference: Reference) {
        return this.findByUI<T>(reference.ui, reference.type)
    }

    findByUI<T extends UniqueItemInterface>(ui: number, type: TargetType) {
        const manager = this.findManager(type)
        return manager.find(ui) as T | undefined
    }

    private getManager(type: TargetType) {
        switch (type) {
            case TargetType.encoding:
                return this.project.oapi.encodingManager

            case TargetType.enumer:
                return this.project.oapi.enumerManager

            case TargetType.examples:
                return this.project.oapi.component.exampleManager

            case TargetType.field:
                return this.project.oapi.fieldManager

            case TargetType.flow:
                return this.project.flowManager

            case TargetType.headers:
                return this.project.oapi.component.headerManager

            case TargetType.parameters:
                return this.project.oapi.component.parameterManager

            case TargetType.paths:
                return this.project.oapi.pathManager

            case TargetType.requestBodies:
                return this.project.oapi.component.requestBodyManager

            case TargetType.responses:
                return this.project.oapi.component.responseManager

            case TargetType.schemas:
                return this.project.oapi.component.schemaManager

            case TargetType.scope:
                return this.project.oapi.scopeManager

            case TargetType.script:
                return this.project.scriptManager

            case TargetType.security:
                return this.project.oapi.component.securitySchemeManager

            case TargetType.tag:
                return this.project.oapi.tagManager

            case TargetType.variable:
                return this.project.oapi.serverVariableManager

            default:
                break
        }
        throw new Error('Unknown TargetType: ' + type)
    }

    findManager(type: TargetType): UniqueItemManagerInterface {
        return this.getManager(type) as any as UniqueItemManagerInterface
    }

    getSchemaFieldList(schema: Schema) {
        return this.schemaFieldFinder.getFieldList(schema)
    }
}
