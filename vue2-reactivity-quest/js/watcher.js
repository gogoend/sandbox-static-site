import { isFunction } from './utils.js'
export class Watcher {
    static wId = 0
    constructor (
        vm,
        expOrFn,
        cb
    ) {
        this.id = Watcher.wId++
        this.deps= []
        this.depIds = new Set()

        if (isFunction(expOrFn)) {
            this.getter = expOrFn
        }
        this.get()
    }
    get() {
        window.globalWatcher = this
        this.value = this.getter()
        // TODO: 此处应当清除暴露在全局的globalWatcher
        // window.globalWatcher = null
        return this.value
    }
    update () {
        this.get()
    }
    addDep(dep) {
        const id = dep.id

        if (!this.depIds.has(id)) {
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
}