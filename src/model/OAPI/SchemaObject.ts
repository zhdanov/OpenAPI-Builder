import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import DataType from './DataType'
import { SchemaFieldManager } from './SchemaField'

export default class SchemaObject extends Item {
    example = ''
    readonly fieldManager = new SchemaFieldManager()
    readonly type = DataType.object

    toOAPI() {
        const result: KeyValue = {
            type: this.type,
            properties: this.fieldManager.toOAPI(),
        }
        const list = this.fieldManager.list
            .filter((one) => one.required)
            .map((one) => one.un)
        if (list.length) {
            result.required = list
        }
        if (this.example) {
            result.example = this.example
        }
        return result
    }
}
