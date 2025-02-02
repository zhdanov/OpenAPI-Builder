import UIItem from '@/model/Entity/UIItem'

describe('UIItem', function () {
    const data = {
        ui: 1,
    }

    it('load', function () {
        const item = new UIItem()
        item.load(data as any)
        expect(item.ui).toBe(data.ui)
    })

    it('throw', function () {
        const item = new UIItem()
        item.ui = 1
        expect(() => (item.ui = 2)).toThrowError()
    })

    it('toJSON', function () {
        const item = new UIItem()
        item.ui = data.ui
        expect(item.toJSON()).toHaveProperty('ui', data.ui)
    })
})
