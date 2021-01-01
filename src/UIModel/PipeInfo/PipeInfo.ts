
namespace flowui {
	/**
	 * 存储槽位实例信息
	 */
	export class PipeSlotsInfo {
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
	 * 存储 pipe type实例信息
	 */
	export class PipeInfo implements eds.IDataClass {
		oid: string

		/**
		 * 节点名称
		 */
		name: string = "标题"

		/**
		 * 模板信息
		 */
		pipeTemp = Null(PipeTemp)

		/**
		 * 存储槽位实例信息
		 */
		pipeSlotsInfo = Null(PipeSlotsInfo)

		/**
		 * 类型
		 */
		get pipeType() {
			return this.pipeTemp.name
		}

		init() {
			this.pipeSlotsInfo = New(PipeSlotsInfo)

			return this
		}
		clear() {
			Del(this.pipeSlotsInfo)
			this.pipeSlotsInfo = null
		}

		/**
		 * 从模板加载实例模型
		 * @param temp 
		 */
		load(temp: PipeTemp) {
			this.pipeTemp = temp

			temp.forEachSlots((slotTemp) => {
				this.pipeSlotsInfo.addNewSlot(slotTemp)
			})
			return this
		}

	}

}