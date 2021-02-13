import { getExcludedList, getIncludedList } from './Decorator'
import ItemManager from './ItemManager'
import KeyValue from './KeyValue'

export default class Item implements KeyValue {
    [key: string]: string | number | boolean | object | KeyValue | string[]

    protected getDescriptor(name: string) {
        let descriptor = null
        let item: KeyValue = this as KeyValue
        while (item) {
            descriptor = Object.getOwnPropertyDescriptor(item, name)
            if (descriptor) {
                return descriptor
            }
            item = Object.getPrototypeOf(item)
        }
        return descriptor
    }

    protected getKeyList() {
        const excludedxx = getExcludedList(this.constructor)
        const includedxx = getIncludedList(this.constructor)
        const set = new Set(Object.getOwnPropertyNames(this))
        excludedxx?.forEach(item => {
            set.delete(item)
        })
        includedxx?.forEach(item => {
            set.add(item)
        })
        return Array.from(set.keys())
    }

    load(source: Item) {
        this.getKeyList().forEach(name => {
            this.loadProperty(name, source)
        })
    }

    protected loadProperty(name: string, source: KeyValue) {
        // console.log('-- load Property ' + name)
        const descriptor = this.getDescriptor(name)
        if (descriptor) {
            if (descriptor.writable) {
                // ok
            } else if (descriptor.get && descriptor.set) {
                // ok
            } else {
                return
            }

            const me: KeyValue = this as KeyValue
            if (me[name] instanceof Item) {
                const item = me[name] as Item
                item.load(source[name] as Item)
            } else if (me[name] instanceof ItemManager) {
                const item = me[name] as ItemManager<Item>
                item.load(source[name] as ItemManager<Item>)
            } else {
                // TypeError: 0 is read-only
                // Object.assign(me[name], source[name])
                if (source[name] === undefined) {
                    return
                }
                me[name] = source[name]
            }
        }
    }

    toJSON(): KeyValue {
        const result: KeyValue = {}
        Object.getOwnPropertyNames(this).forEach(name => {
            const item = this[name as keyof this]
            if (item instanceof Item) {
                result[name] = item.toJSON()
            } else if (item instanceof ItemManager) {
                result[name] = item.toJSON()
            } else {
                result[name] = item
            }
        })
        return result
    }

    toOAPI(): KeyValue {
        const result: KeyValue = {}
        Object.getOwnPropertyNames(this).forEach(name => {
            const item = this[name as keyof this]
            if (item instanceof Item) {
                result[name] = item.toOAPI()
            } else if (item instanceof ItemManager) {
                result[name] = item.toOAPI()
            } else {
                result[name] = item
            }
        })
        return result
    }
}