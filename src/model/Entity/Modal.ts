export default class Modal {
    callback: CallableFunction = () => {}
    title = ''
    visible = false

    hide() {
        this.visible = false
    }

    show(title: string, callback: CallableFunction) {
        this.title = title
        this.callback = callback
        this.visible = true
    }
}
