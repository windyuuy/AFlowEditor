
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
		get inputEdges(): EdgeInfo[] {
			let edges = dataManager.query().with({
				filter: (data) => {
					return data instanceof EdgeInfo && data.inputSlot.oid == this.oid
				}
			}).toArray<EdgeInfo>()
			return edges
		}
		/**
		 * 输出边列表
		 */
		get outputEdges(): EdgeInfo[] {
			let edges = dataManager.query().with({
				filter: (data) => {
					return data instanceof EdgeInfo && data.outputSlot.oid == this.oid
				}
			}).toArray<EdgeInfo>()
			return edges
		}

		init() {
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