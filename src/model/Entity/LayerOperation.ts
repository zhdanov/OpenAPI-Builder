import TargetType from '../OAPI/TargetType'
import { LayerManager } from './Layer'
import LayerRequestBody from './LayerRequestBody'
import { LayerResponseManager } from './LayerResponse'
import LayerSecurityScheme from './LayerSecurityScheme'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerOperation extends UniqueItem {
    withRequestBody = false
    withSecurity = false
    readonly parameterManager = new LayerManager(TargetType.parameters)
    readonly requestBody = new LayerRequestBody(
        '${schema.un}_${operation.un + path.suffix}',
    )
    readonly security = new LayerSecurityScheme('${schema.un}', TargetType.security)
    readonly statusManager = new LayerResponseManager()
    readonly tagManager = new LayerManager(TargetType.tag)
}

export class LayerOperationManager extends UniqueItemManager<LayerOperation> {
    constructor() {
        super(LayerOperation)
    }
}
