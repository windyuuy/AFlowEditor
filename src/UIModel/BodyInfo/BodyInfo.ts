
namespace flowui {
	/**
	 * 存储槽位实例信息
	 */
	export class BodySlotsInfo {
		inputs: Table<SlotInfo>
		outputs: Table<SlotInfo>

		init() {
			this.inputs = CleanTable(this.inputs)
			return this
		}
	}

	/**
	 * 存储body type实例信息
	 */
	export class BodyInfo implements eds.IDataClass {
		oid: string

		/**
		 * 节点名称
		 */
		name: string

		/**
		 * 模板信息
		 */
		bodyTemp = Null(BodyTemp)

		/**
		 * 存储槽位实例信息
		 */
		bodySlotsInfo = Null(BodySlotsInfo)

		get bodyType() {
			return this.bodyTemp.name
		}

		init() {
			this.bodySlotsInfo = New(BodySlotsInfo)

			return this
		}

	}

}