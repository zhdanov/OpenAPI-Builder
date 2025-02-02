export default class Modal {
    callback: CallableFunction = () => {}
    size = ''
    title = ''
    visible = false

    hide() {
        this.visible = false
    }

    protected show(title: string, callback: CallableFunction) {
        this.title = title
        this.callback = callback
        this.visible = true
    }
}
