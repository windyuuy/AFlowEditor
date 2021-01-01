
namespace flowui {
	export class SlotGroup {
		oid: string

		/**
		 * 分组名称
		 */
		name: string

		/**
		 * 槽位方位
		 */
		slotPos: SlotPosType

		/**
		 * 槽位模板列表
		 */
		slots: SlotTemp[]

		init() {
			DelAll(this.slots)
			this.slots = CleanArray(this.slots)

			return this;
		}
		clear() {
			this.init()
		}

		/**
		 * 创建槽位信息
		 * @param slotName 
		 * @param slotType 
		 */
		addNewSlot(slotName: string, slotType: string) {
			let slot = New(SlotTemp)
			slot.name = slotName
			slot.slotType = slotType
			slot.group = this
			this.slots.push(slot)
		}
	}

}