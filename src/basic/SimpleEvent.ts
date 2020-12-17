namespace lang.event {
	export type EventHandler<T> = (message: T) => void
	export class SimpleEvent<T> {
		protected _callbacks: EventHandler<T>[] = []

		get len() {
			return this._callbacks.length
		}

		on(callback: EventHandler<T>) {
			this._callbacks.push(callback)
		}

		off(callback: EventHandler<T>) {
			this._callbacks.splice(this._callbacks.indexOf(callback), 1)
		}

		emit(value: T) {
			this._callbacks.concat().forEach((callback) => {
				callback(value)
			})
		}
	}

	export interface ISEventInput<T> {
		emit(key: string, value: T)
	}

	export interface ISEventOutput<T> {
		on(key: string, callback: EventHandler<T>)
		off(key: string, callback: EventHandler<T>)
	}

	export class SEvent<T> implements ISEventInput<T>, ISEventOutput<T>{
		protected _events: { [key: string]: SimpleEvent<T> } = Object.create(null)

		exist(key: string) {
			const event = this._events[key]
			if (event && event.len > 0) {
				return true
			}
			return false
		}

		on(key: string, callback: EventHandler<T>) {
			if (!this._events[key]) {
				this._events[key] = new SimpleEvent<T>()
			}
			const event = this._events[key]
			if (event) {
				event.on(callback)
			}
		}

		off(key: string, callback: EventHandler<T>) {
			if (callback == undefined) {
				this._events[key] = undefined
			} else {
				const event = this._events[key]
				if (event) {
					event.off(callback)
				}
			}
		}

		emit(key: string, value: T) {
			if (this._events[key]) {
				const event = this._events[key]
				if (event) {
					event.emit(value)
				}
			}
		}
	}
}
