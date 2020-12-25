namespace lang.helper {

	export class ArrayHelper {
		static max<T>(ls: T[], call: (e: T) => number): T | undefined {
			let maxValue = -Infinity
			let maxEle = ls[0]
			for (let e of ls) {
				let value = call(e)
				if (maxValue <= value) {
					maxValue = value
					maxEle = e
				}
			}
			return maxEle
		}

		static min<T>(ls: T[], call: (e: T) => number): T | undefined {
			let minValue = Infinity
			let minEle = ls[0]
			for (let e of ls) {
				let value = call(e)
				if (minValue >= value) {
					minValue = value
					minEle = e
				}
			}
			return minEle
		}

		static foreachDifferentPairs<T, F>(ls1: T[], call1: (e: T) => string, ls2: F[], call2: (e: F) => string, call: (e1: T, e2: F) => any) {
			const ls1Map: { [key: string]: T } = EmptyTable()
			const ls2Map: { [key: string]: F } = EmptyTable()
			ls1.forEach(e => {
				let id = call1(e)
				ls1Map[id] = e
			})
			ls2.forEach(e => {
				let id = call2(e)
				ls2Map[id] = e
			})
			for (let id in ls1Map) {
				const e1 = ls1Map[id]
				const e2 = ls2Map[id]
				call(e1, e2)
			}
			for (let id in ls2Map) {
				const e1 = ls1Map[id]
				const e2 = ls2Map[id]
				if (!(id in ls1Map)) {
					call(e1, e2)
				}
			}
		}

	}

}
