
namespace flowui {
	/**
	 * 节点槽位类型信息
	 */
	export class PipeSlotSpec {
		/**
		 * 输入槽位列表
		 */
		inputs: SlotGroup[]
		/**
		 * 输出槽位列表
		 */
		outputs: SlotGroup[]

		init() {
			DelAll(this.inputs)
			DelAll(this.outputs)
			this.inputs = CleanArray(this.inputs)
			this.outputs = CleanArray(this.inputs)
			return this
		}

		clear() {
			this.init()
		}
	}

	/**
	 * 节点信息
	 */
	export class PipeTemp implements eds.IDataClass {
		readonly oid: string
		readonly otype: string

		/**
		 * 模板名称
		 */
		name: string

		/**
		 * 指示槽位设置的代码
		 * - 书写格式
		 */
		slotSpecCode: string
		lastSlotSpecCode: string
		/**
		 * 由代码生成的槽点信息缓存
		 */
		slotSpec = Null(PipeSlotSpec)

		init() {
			this.slotSpec = New(PipeSlotSpec)
			return this
		}
		clear() {
			Del(this.slotSpec)
			this.slotSpec = null
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

		parseSlotInfo(slotSpecCode: string, shallWarn: boolean = false) {

			let inputGroups: SlotGroup[] = []
			let outputGroups: SlotGroup[] = []

			let isOk = false
			try {
				let codeLines = slotSpecCode.split("\n")
				codeLines.forEach(line => {
					line = line.trim()
					if (!line) {
						return
					}
					let m = line.match(/\s*((?:in)|(?:out))\s+(.+)/)
					let prefix = m[1]
					let slotsLine = m[2].trim()
					let slotInfos = slotsLine.split(',')

					slotInfos.forEach(slotInfo => {
						let m2 = slotInfo.match(/(?:([a-zA-Z_0-9]+)\.)?([a-zA-Z_0-9]+)\:(.+)/)
						let [_, groupName, slotName, slotType] = m2
						if (groupName == null) {
							groupName = "default"
						}
						let groups = prefix == "out" ? outputGroups : inputGroups
						let group = groups.find(group => group.name == groupName)
						if (group == null) {
							group = New(SlotGroup)
							group.name = groupName
							group.slotPos = prefix as any
							groups.push(group)
						}
						group.addNewSlot(slotName, slotType)
					})
				})
				isOk = true
			} catch (e) {
				console.error("parse slots info failed:")
			}

			return {
				isOk,
				inputGroups,
				outputGroups,
			}
		}

		/**
		 * 由槽位指示代码更新槽位信息
		 */
		updateSlotSpec() {
			let slotSpecCode = this.slotSpecCode
			if (this.lastSlotSpecCode != this.slotSpecCode) {
				this.lastSlotSpecCode = this.slotSpecCode

				// 兼容中文逗号
				slotSpecCode = slotSpecCode.replace(/，/mg, ',')

				let { isOk, inputGroups, outputGroups, } = this.parseSlotInfo(this.slotSpecCode)

				if (isOk) {
					const slotSpec = this.slotSpec
					slotSpec.clear()
					slotSpec.inputs.push(...inputGroups)
					slotSpec.outputs.push(...outputGroups)
					this.lastSlotSpecCode = slotSpecCode
				}

			}

		}

	}

}