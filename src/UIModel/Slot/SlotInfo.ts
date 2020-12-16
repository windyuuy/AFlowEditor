
namespace flowui {
	/**
	 * 槽点信息
	 */
	export class SlotInfo {
		oid: string

		/**
		 * 模板信息
		 */
		slotTemp = Null(SlotTemp)

		/**
		 * 槽点名称
		 */
		get slotTitle() {
			return this.slotTemp.name
		}
	}

}