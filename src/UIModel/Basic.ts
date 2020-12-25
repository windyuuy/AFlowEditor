
/// <reference path="../deps/spritejs/spritejs.js" />
/// <reference path="../basic/Basic.ts" />
/// <reference path="../basic/ObjectUtils.ts" />
/// <reference path="../basic/Vector.ts" />
/// <reference path="../basic/ZSize.ts" />
/// <reference path="../basic/ArrayHelper.ts" />
/// <reference path="../eds/Basic.ts" />
/// <reference path="../eds/DataClass.ts" />



namespace flowui {
	window["flowui"] = flowui

	export import bool = eds.bool
	import StrTypeMap = lang.StrTypeMap
	export import Table = lang.StrTypeMap
	export import EmptyTable = lang.EmptyTable
	export import IDataClass = eds.IDataClass
	export import NullData = eds.NullData
	export import NewData = eds.NewData

	export import Vector = math.Vector
	export import Vector2 = math.Vector2
	export import Vector3 = math.Vector3
	export import Vector4 = math.Vector4
	export import Size2 = math.Size2

	export import ArrayHelper = lang.helper.ArrayHelper

	export import ccs = spritejs

	const _shareArray: any[] = []
	export function _ShareArray() {
		_shareArray.length = 0
		return _shareArray
	}

	export function toEulerAngle(arcAngle: number) {
		return arcAngle * 180 / Math.PI
	}

	export function toArcAngle(eulerAngle: number) {
		return eulerAngle * Math.PI / 180
	}

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
	export function Alloc<T>(cls: new () => T): T {
		let data = dataManager.addData(cls)
		return data
	}
	export function New<T>(cls: new () => T, paras?: any[]): T {
		let data = dataManager.addData(cls)
		if (data["init"]) {
			if (!paras) {
				data["init"]()
			} else {
				data["init"](...paras)
			}
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
		if (container == null) {
			return false
		}

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
