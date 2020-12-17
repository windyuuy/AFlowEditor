
namespace flowui {
	export import bool = eds.bool
	import StrTypeMap = lang.StrTypeMap
	export import Table = lang.StrTypeMap
	import EmptyTable = lang.EmptyTable
	export import IDataClass = eds.IDataClass
	import NullData = eds.NullData
	export import NewData = eds.NewData

	export let dataManager: eds.DataManager

	/**
	 * 遍历常规容器
	 * @param container 
	 * @param call 
	 */
	export function forEach<T>(container: T, call: (data: T, index: number | string) => any) {
		if (container == null) {
			return true
		}

		if (container instanceof Array) {
			for (let i = 0; i < container.length; i++) {
				if (call(container[i], i)) {
					break
				}
			}
		} else {
			for (let key of Object.keys(container)) {
				if (call(container[key], key)) {
					break
				}
			}
		}
		return
	}

	export const Null = NullData
	export const NULL = NullData
	export function Alloc<T>(cls: new () => T): T {
		let data = dataManager.addData(cls)
		return data
	}
	export function New<T>(cls: new () => T, paras?: any[]): T {
		let data = dataManager.addData(cls)
		if (data["init"]) {
			data["init"](...paras)
		}
		return data
	}
	export function TableAdd(container: Object, obj: { oid: string }) {
		container[obj.oid] = obj
	}
	export const NEW = New
	export function Del<T>(data: T): bool {
		let b = dataManager.deattachData(data)
		if (data["clear"]) {
			data["clear"]()
		}
		return b
	}
	/**
	 * 删除所有注册数据
	 * @param container 
	 */
	export function DelAll<T>(container: T): bool {
		forEach(container, (data) => {
			Del(data)
		})
		return true
	}
	export function Clean<T extends Object>(container: T): T {
		if (container == null) {
			return container
		}

		if (container instanceof Array) {
			container.length = 0
		} else {
			for (let key of Object.keys(container)) {
				delete container[key]
			}
		}
		return container
	}
	export function CleanTable<T extends Object>(container: T): T {
		if (container == null) {
			return EmptyTable()
		} else {
			return Clean(container)
		}
	}
	export function CleanArray<T extends Object>(container: T[]): T[] {
		if (container == null) {
			return []
		} else {
			return Clean(container)
		}
	}
}
