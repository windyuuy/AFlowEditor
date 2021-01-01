
namespace flowui {
	export class SlotTemp {
		oid: string
		/**
		 * 槽位类型名称
		 */
		name: string

		/**
		 * 槽位类型信息
		 */
		slotType: string

		/**
		 * 所属分组
		 */
		group = Null(SlotGroup)

		/**
		 * 槽位方位
		 */
		get slotPos(): SlotPosType {
			return this.group.slotPos
		}

		/**
		 * 所属分组名称
		 */
		get groupName() {
			return this.group.name
		}
	}

}