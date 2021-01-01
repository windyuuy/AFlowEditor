

namespace eds {

	function buildGetSet(target: Object, property: string, dataManager: DataManager) {
		const value0 = target[property]
		const hiddenProp = "__" + property + "__"

		if ((value0 instanceof DataClassDef)) {
			delete target[property]
			if (value0 == _NullData) {
				target[hiddenProp] = ""
			} else {
				let ctype = value0.t
				let subData = dataManager.addData(ctype)
				target[hiddenProp] = subData.oid
			}
			Object.defineProperty(target, property, {
				get: function () {
					let oid = this[hiddenProp]
					let data = this.dataManager.getDataById(oid)
					return data
				},
				set: function (value) {
					if (value == null) {
						this[hiddenProp] = ""
					} else {
						let targetOid = value.oid
						if (this[hiddenProp] != targetOid) {
							this[hiddenProp] = targetOid
							// this.dataManager.dirtyManager.markDirty(this)
						}
					}
				}
			});
		}
	}

	export function DefindECSDataMetaValue(data: IDataClass, dataManager: DataManager) {
		let uidTool = dataManager.utils.uidTool

		const typeName = data["constructor"].name
		Object.defineProperty(data, 'otype', {
			value: typeName,
			writable: false,
			enumerable: false,
		})
		Object.defineProperty(data, 'oid', {
			value: uidTool.genTypedId(typeName),
			writable: false,
			enumerable: false,
		})
		Object.defineProperty(data, 'dataManager', {
			value: dataManager,
			writable: false,
			enumerable: false,
		})
	}

	export function DecoECSDataClass(data: IDataClass, dataManager: DataManager) {
		if (data.oid) {
			return
		}

		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				buildGetSet(data, key, dataManager);
			}
		}

		DefindECSDataMetaValue(data, dataManager)
	}

}
