
namespace flowui {
	/**
	 * 节点槽位类型信息
	 */
	export class BodySlotSpec {
		inputs: SlotGroup[]
		outputs: SlotGroup[]

		init() {
			this.inputs = CleanArray(this.inputs)
			this.outputs = CleanArray(this.inputs)
			return this
		}

		reset() {
			this.init()
		}
	}

	/**
	 * 节点信息
	 */
	export class BodyTemp implements eds.IDataClass {
		readonly oid: string
		readonly otype: string
		name: string

		/**
		 * 指示槽位设置的代码
		 * - 书写格式
		 */
		slotSpecCode: string
		/**
		 * 由代码生成的槽点信息缓存
		 */
		slotSpec = Null(BodySlotSpec)

		init() {
			this.slotSpec = New(BodySlotSpec)
			return this
		}

		forEachSlots(call: (slotTemp: SlotTemp) => void) {
			const slotSpec = this.slotSpec
			slotSpec.inputs.forEach(group => {
				group.slots.forEach(slotTemp => {
					call(slotTemp)
				})
			})
			slotSpec.outputs.forEach(group => {
				group.slots.forEach(slotTemp => {
					call(slotTemp)
				})
			})
		}

		/**
		 * 由槽位指示代码更新槽位信息
		 */
		updateSlotSpec() {
			let slotSpecCode = this.slotSpecCode

			// 兼容中文逗号
			slotSpecCode = slotSpecCode.replace(/，/mg, ',')

			const slotSpec = this.slotSpec
			slotSpec.reset()

			let codeLines = slotSpecCode.split("\n")
			codeLines.forEach(line => {
				let m = line.match(/\s*((?:in)|(?:out))\s+(.+)/)
				let prefix = m[1]
				let slotsLine = m[2]
				let slotInfos = slotsLine.split(',')

				slotInfos.forEach(slotInfo => {
					let m2 = slotInfo.match(/(?:([a-zA-Z_0-9]+)\.)?([a-zA-Z_0-9]+)\:(.+)/)
					let [_, groupName, slotName, slotType] = m2
					if (groupName == null) {
						groupName = "default"
					}
					let groups = prefix == "out" ? slotSpec.outputs : slotSpec.inputs
					let group = groups.find(group => group.name == groupName)
					if (group == null) {
						group = New(SlotGroup)
						groups.push(group)
					}
					let slot = New(SlotTemp)
					slot.name = slotName
					slot.slotType = slotType
					slot.group = group
					group[slotName] = slot
				})
			})
		}

	}

}