
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
		slotPos: "in" | "out"

		/**
		 * 槽位模板列表
		 */
		slots: SlotTemp[]

		init() {
			this.slots = CleanArray(this.slots)

			return this;
		}
	}

}