
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
		 * 输入边列表
		 */
		inputEdges: EdgeInfo[]
		/**
		 * 输出边列表
		 */
		outputEdges: EdgeInfo[]

		init() {
			this.inputEdges = CleanArray(this.inputEdges)
			this.outputEdges = CleanArray(this.outputEdges)

			return this
		}

		/**
		 * 槽点名称
		 */
		get slotTitle() {
			return this.slotTemp.name
		}
	}

}