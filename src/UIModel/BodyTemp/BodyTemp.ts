
namespace flowui {
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
					let groupMap = prefix == "out" ? slotSpec.outputs : slotSpec.inputs
					let group = groupMap[groupName] ? groupMap[groupName] : groupMap[groupName] = New(SlotGroup)
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