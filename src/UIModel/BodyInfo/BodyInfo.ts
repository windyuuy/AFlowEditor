
namespace flowui {
	/**
	 * 存储槽位实例信息
	 */
	export class BodySlotsInfo {
		inputs: Table<SlotInfo>
		outputs: Table<SlotInfo>

		init() {
			DelAll(this.inputs)
			this.inputs = CleanTable(this.inputs)
			DelAll(this.outputs)
			this.outputs = CleanTable(this.outputs)
			return this
		}

		clear() {
			this.init()
		}

		addNewSlot(slotTemp: SlotTemp) {
			let slot = New(SlotInfo)
			slot.slotTemp = slotTemp

			if (slotTemp.slotPos == "in") {
				TableAdd(this.inputs, slot)
			} else {
				TableAdd(this.outputs, slot)
			}
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

		/**
		 * 类型
		 */
		get bodyType() {
			return this.bodyTemp.name
		}

		init() {
			this.bodySlotsInfo = New(BodySlotsInfo)

			return this
		}
		clear() {
			Del(this.bodySlotsInfo)
			this.bodySlotsInfo = null
		}

		/**
		 * 从模板加载实例模型
		 * @param temp 
		 */
		load(temp: BodyTemp) {
			this.bodyTemp = temp

			temp.forEachSlots((slotTemp) => {
				this.bodySlotsInfo.addNewSlot(slotTemp)
			})
			return this
		}

	}

}