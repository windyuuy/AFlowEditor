
namespace flowui {
	/**
	 * 存储槽位实例信息
	 */
	export class BodySlotsInfo {
		inputs: Table<Slot>
		outputs: Table<Slot>

		init() {
			this.inputs = CleanTable(this.inputs)
			return this
		}
	}

	/**
	 * 存储body type实例信息
	 */
	export class BodyInfo implements eds.IDataClass {
		readonly oid: string = ""
		readonly otype: string = ""
		name: string = ""

		/**
		 * 模板信息
		 */
		bodyType = Null(BodyType)

		/**
		 * 存储槽位实例信息
		 */
		bodySlotsInfo = Null(BodySlotsInfo)

		init() {
			this.bodySlotsInfo = New(BodySlotsInfo)

			return this
		}

	}

}