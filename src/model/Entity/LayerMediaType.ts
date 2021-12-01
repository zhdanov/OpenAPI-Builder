import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerMediaType extends UniqueItem {
    unPattern = '${schema.un}_${operation.un}${path.suffix}'
}

export class LayerMediaTypeManager extends UniqueItemManager<LayerMediaType> {
    constructor() {
        super(LayerMediaType)
    }
}
