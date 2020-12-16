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
	}

}
