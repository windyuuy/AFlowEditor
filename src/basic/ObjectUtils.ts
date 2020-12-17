
namespace lang {
	export type bool = boolean

	export const EmptyCall = function (): any { }

	export const EmptyTable = function () {
		return Object.create(null)
		// return {}
	}

	const _copyDataDeep = (source: object, target: object) => {
		for (let key of Object.getOwnPropertyNames(source)) {
			// 清除溢出字段
			if (target[key] == null) {
				delete source[key]
			}
		}
		for (let key of Object.getOwnPropertyNames(target)) {
			let tvalue = target[key]
			if (tvalue == null) {
				source[key] = target[key]
			} else if (typeof (tvalue) == "object") {
				let svalue = source[key]
				if (typeof (svalue) != "object" || svalue == tvalue) {
					// 指向同一个对象或空，则重新创建新的
					svalue = {}
					source[key] = svalue
				}
				_copyDataDeep(svalue, tvalue)
			} else {
				if (source[key] != target[key]) {
					source[key] = target[key]
				}
			}
		}
	}

	export class ObjectUtils {
		static copyDataDeep<T extends object>(source: T, target: T): T {
			if (target == null) {
				return null as any
			} else if (typeof (source) == "object" && typeof (target) == "object") {
				_copyDataDeep(source, target)
				return source
			} else {
				return target
			}
		}
	}
}