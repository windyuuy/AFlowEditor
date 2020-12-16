
namespace flowui {
	export import bool = eds.bool
	import StrTypeMap = lang.StrTypeMap
	export import Table = lang.StrTypeMap
	import EmptyTable = lang.EmptyTable
	export import IDataClass = eds.IDataClass
	import NullData = eds.NullData
	export import NewData = eds.NewData

	export let dataManager: eds.DataManager

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
	export const NEW = New
	export function Del<T>(data: T): bool {
		return dataManager.deattachData(data)
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
