

namespace eds {

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

		DefindECSDataMetaValue(data, dataManager)
	}

}
