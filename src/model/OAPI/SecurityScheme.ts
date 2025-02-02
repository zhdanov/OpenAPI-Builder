import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { OAPIOAuthFlow, OAuthFlowManager } from './OAuthFlow'
import { Location } from './Parameter'

export enum SecurityType {
    apiKey = 'apiKey',
    http = 'http',
    oauth2 = 'oauth2',
    openIdConnect = 'openIdConnect',
}

interface OAPISecurityScheme {
    bearerFormat?: string
    description: string
    flows?: ObjectMap<OAPIOAuthFlow>
    in?: string
    name?: string
    openIdConnectUrl?: string
    scheme?: string
    type: string
}

export default class SecurityScheme extends SideBarItem {
    type: SecurityType = SecurityType.http
    name = ''
    location: Location
    scheme = 'bearer'
    bearerFormat = 'JWT'
    openIdConnectUrl = ''
    readonly oAuthFlowManager = new OAuthFlowManager()

    constructor(name: string, location: Location = Location.header) {
        super(name)
        this.name = name
        this.location = location
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const result: OAPISecurityScheme = {
            type: this.type,
            description: this.description,
        }

        if (this.type === SecurityType.openIdConnect) {
            result.openIdConnectUrl = this.openIdConnectUrl
            return result
        }

        if (this.type === SecurityType.apiKey) {
            result.name = this.name
            result.in = this.location
            return result
        }

        if (this.type === SecurityType.http) {
            result.scheme = this.scheme
            result.bearerFormat = this.bearerFormat
            return result
        }

        result.flows = this.oAuthFlowManager.toOAPI(finder)
        return result
    }
}

export class SecuritySchemeManager extends UniqueItemManager<SecurityScheme> {
    constructor() {
        super(SecurityScheme)
    }
}
