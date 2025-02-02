import Reference from '../OAPI/Reference'
import TargetType from '../OAPI/TargetType'
import UniqueItem from './UniqueItem'

export default class LayerSchema extends UniqueItem {
    readonly script = new Reference(0, TargetType.script)

    get unPattern() {
        return this.un
    }

    set unPattern(text: string) {
        this.un = text
    }
}
