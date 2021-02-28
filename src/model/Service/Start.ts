import { ActionEnum } from '../Bridge/FromJava/ActionEnum'
import Bridge from '../Bridge/FromJava/Bridge'
import HandlerManager from '../Bridge/FromJava/HandlerManager'
import { StatusEnum } from '../Bridge/FromJava/StatusEnum'
import CEFW from '../Bridge/ToJava/CEFW'
import Route from '../Bridge/ToJava/Route'
import Project from '../Data/Project'
import { SideBarEnum } from '../Data/SideBar'
import { EventEnum } from '../Event/StateEvent'
import Vendor from '../Vendor'
import Load from './Load'
import File from './File'
import Manager from './Manager'

export default class Start {
    static run(preset: Project, window: CEFW) {
        const manager = new HandlerManager()
        const route = new Route(window, manager)
        const service = new Manager(new File(route))
        const state = new Vendor(preset, route, service)

        window.bridge = new Bridge(manager)
        manager.add(ActionEnum.error, '*', response => {
            alert(response.message)
        })

        manager.add(ActionEnum.load, 'project', response => {
            Load.run(response, state)
            state.sbManager.bind(state.project!)
            state.show(SideBarEnum.Example)
            state.event.state.ee.emit(EventEnum.AfterProjectLoad, state.project!)
            if (response.status === 444) {
                this.setJavaBridge(window)
            }
        })

        manager.add(ActionEnum.save, 'project', response => {
            if (response.status === StatusEnum.OK) {
                service.save(state.getProject())
            }
        })

        setInterval(() => {
            if (state.ready) {
                if (window.JavaBridge) {
                    if (state.project!.autoSave) {
                        service.save(state.getProject())
                    }
                }
            }
        }, 11122)

        return state
    }

    static setJavaBridge(cefw: CEFW) {
        if (process.env.NODE_ENV === 'development') {
            cefw.JavaBridge = {
                call(text) {
                    const json = JSON.parse(text)
                    console.log(json.data)
                    json.data = ''
                    json.status = 444
                    json.message = 'Echo'
                    cefw.bridge.call(json)
                },
            }
        }
    }
}
