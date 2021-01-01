

namespace flowui {
	export class EdgeViewModel extends NodeViewModel {
		init() {
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
		isDragingInput: bool = false
		isDragingOutput: bool = false

		private _arrowPos: Vector2 = new Vector2()
		public get arrowPos(): Vector2 {
			return this._arrowPos
		}
		public set arrowPos(value: Vector2) {
			this._arrowPos.merge(value)
		}
		private _tailPos: Vector2 = new Vector2()
		public get tailPos(): Vector2 {
			return this._tailPos
		}
		public set tailPos(value: Vector2) {
			this._tailPos.merge(value)
		}

		updateLayout() {
			let tailPos = this.tailPos
			let arrowPos = this.arrowPos
			let isInputBinded = !this.isDragingInput && this.inputSlotViewModel
			let isOutputBinded = !this.isDragingOutput && this.outputSlotViewModel
			if (isInputBinded) {
				tailPos = this.inputSlotViewModel.transform.getWorldPosition()
			}
			if (isOutputBinded) {
				arrowPos = this.outputSlotViewModel.transform.getWorldPosition()
			}
			if (isInputBinded) {
				tailPos = EdgeViewModel.fromCircleCenterToEdge(tailPos, arrowPos, this.inputSlotViewModel.radius)
			}
			if (isOutputBinded) {
				arrowPos = EdgeViewModel.fromCircleCenterToEdge(arrowPos, tailPos, this.outputSlotViewModel.radius)
			}

			this.tailPos = tailPos
			this.arrowPos = arrowPos
		}

		protected static fromCircleCenterToEdge(tailPos: Vector2, arrowPos: Vector2, radius: number) {
			let startJointPos = arrowPos.clone()
				.subDown(tailPos)
				.normalizeSelf()
				.multUpVar(radius)
				.addUp(tailPos)
			return startJointPos
		}
	}
}
