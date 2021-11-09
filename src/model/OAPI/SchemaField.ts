import KeyValue from '../Entity/KeyValue'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { SimpleType } from './DataType'
import Reference, { ReferenceType } from './Reference'
import Schema from './Schema'

export default class SchemaField extends Schema {
    example = ''
    format = ''
    isArray = false
    required = true
    schemaUI = 0
    type: SimpleType = SimpleType.string

    readonly reference = new Reference('', ReferenceType.schemas)

    refer(un: string, type: ReferenceType = ReferenceType.schemas) {
        this.type = SimpleType.reference
        this.reference.un = un
        this.reference.type = type
    }

    makeArray() {
        return {
            type: 'array',
            items: this.makeData(),
        }
    }

    makeData() {
        if (this.type === SimpleType.reference) {
            return this.reference.toOAPI()
        }

        const result: KeyValue = {
            type: this.type,
        }
        if (this.example) {
            result.example = this.example
        }
        if (this.format) {
            result.format = this.format
        }
        return result
    }

    toOAPI() {
        if (this.type === SimpleType.template) {
            return JSON.parse(this.text)
        }

        if (this.isArray) {
            return this.makeArray()
        }

        return this.makeData()
    }
}

export class SchemaFieldManager extends UniqueItemManager<SchemaField> {
    constructor(unique = true) {
        super(SchemaField, unique)
    }

    add(item: SchemaField) {
        const found = this.list.find(
            (field) => field.schemaUI === item.schemaUI && field.un === item.un,
        )
        if (found) {
            throw new Error(`Field ${item.un} already exists!`)
        }
        super.add(item)
    }

    findAll(ui: number) {
        return this.list.filter((field) => field.schemaUI === ui)
    }
}
