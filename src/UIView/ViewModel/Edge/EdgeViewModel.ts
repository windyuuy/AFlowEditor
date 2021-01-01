

namespace flowui {
	export class EdgeViewModel extends NodeViewModel {
		init() {
			this._arrowPos = new Vector2()
			this._tailPos = new Vector2()
			return super.init()
		}

		/**
		 * 边缘信息
		 */
		edgeInfo = RefData(EdgeInfo)

		inputSlotViewModel = RefData(SlotViewModel)
		outputSlotViewModel = RefData(SlotViewModel)

		/**
		 * 当前连线是否处于主动拖动状态
		 */
		isDraging: bool = false

		private _arrowPos: Vector2
		public get arrowPos(): Vector2 {
			return this._arrowPos
		}
		public set arrowPos(value: Vector2) {
			this._arrowPos.merge(value)
		}
		private _tailPos: Vector2
		public get tailPos(): Vector2 {
			return this._tailPos
		}
		public set tailPos(value: Vector2) {
			this._tailPos.merge(value)
		}

		updateLayout() {
			if (this.isDraging) {
				let tailPos = this.inputSlotViewModel.transform.position
				let arrowPos = this.outputSlotViewModel.transform.position

			}
		}
	}
}
