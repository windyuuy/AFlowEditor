
namespace lang {
	export class Intervals {
		static readonly inst = new Intervals().init()
		intervals: any[]
		timeouts: any[]
		sw = { on: true }

		init() {
			this.intervals = []
			this.timeouts = []
			this.namedSchedules = EmptyTable()
			return this
		}

		setInterval(call: Function, duration: number) {
			let sw = this.sw
			let timerId = setInterval(() => {
				if (sw.on == false) {
					return
				}
				call()
			}, duration)
			this.intervals.push(timerId)
			return timerId
		}

		clearInterval(timerId: any) {
			let index = this.intervals.indexOf(timerId)
			if (index >= 0) {
				this.intervals.splice(index, 1)
				clearInterval(timerId)
			}
		}

		clearAllInterval() {
			this.sw.on = false
			for (let id of this.intervals) {
				clearInterval(id)
			}
			this.sw = { on: true }
			this.intervals.length = 0
		}

		setTimeout(call: Function, duration: number) {
			let timerId = setTimeout(call, duration)
			this.timeouts.push(timerId)
			return timerId
		}

		clearAllTimeout() {
			for (let id of this.timeouts) {
				clearTimeout(id)
			}
			this.timeouts.length = 0
		}

		clearAllTimer() {
			this.clearAllInterval()
			this.clearAllTimeout()
		}

		protected namedSchedules: StrTypeMap<any>
		setNamedInterval(name: string, call: Function, duration: number) {
			let timerId = this.setInterval(call, duration)
			this.namedSchedules[name] = timerId
			return timerId
		}

		clearNamedInterval(name: string) {
			let timerId = this.namedSchedules[name]
			this.clearInterval(timerId)
		}

	}
}