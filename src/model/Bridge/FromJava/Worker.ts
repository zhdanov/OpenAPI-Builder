import { ActionEnum } from './ActionEnum'
import HandlerManager from './HandlerManager'
import Response from './Response'

export default class Worker {
    constructor(readonly manager: HandlerManager) {}

    call(response: Response) {
        if ('string' === typeof response) {
            response = JSON.parse(response)
        }
        console.log(
            `${response.status} ${response.action} ${response.key} ${response.message}`,
        )
        const handler = this.manager.find(response.action, response.key)
        if (handler) {
            try {
                if (this.isHTTP(response.action)) {
                    if (response.data.length > 0) {
                        const data = JSON.parse(response.data)
                        return handler(data)
                    }
                }
                handler(response)
            } catch (error) {
                console.error(error)
                alert(error)
            }
        } else {
            const message = 'No handler'
            console.error(message)
            alert(message)
        }
    }

    isHTTP(action: ActionEnum) {
        if (action === ActionEnum.get || action === ActionEnum.post) {
            return true
        }
        return false
    }

    error(code: number, message: string) {
        console.log(`${code} ${message}`)
        alert(message)
    }
}
