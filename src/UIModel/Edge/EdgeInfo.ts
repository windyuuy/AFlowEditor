

namespace flowui {
	/**
	 * 槽点信息
	 */
	export class EdgeInfo {
		oid: string

		/**
		 * 输入端点
		 */
		inputSlot = Null(SlotInfo)
		/**
		 * 输出端点
		 */
		outputSlot = Null(SlotInfo)
	}

}