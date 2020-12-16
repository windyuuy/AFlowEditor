
namespace flowui {
	export class BodyType implements eds.IDataClass {
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
		slotSpec: BodySlotSpec

		init() {
			this.slotSpec = new BodySlotSpec().init()
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
				let slotNames = slotsLine.split(',')

				if (prefix == "in") {
					slotNames.forEach(slotName => {
						let slot = new Slot()
						slot.name = slotName
						slotSpec.inputs.push()
					})
				} else {
					slotNames.forEach(slotName => {
						let slot = new Slot()
						slot.name = slotName
						slotSpec.outputs.push()
					})
				}
			})
		}

	}

}