

namespace flowui {
	export class EdgeJointViewModel implements IDataClass {

		jointPos: SlotPosType = SlotPosType.in

		connectSlot(slot: SlotViewModel) {
			if (this.jointPos == slot.slotTemp.slotPos) {
				throw new Error("invalid composition to concat")
			}
			this.slotViewModel = slot
		}
		depart() {
			this.slotViewModel = null
		}
		readonly oid?: string;
		/**
		 * 类型名
		 */
		readonly otype?: string

		/**
		 * 当前端点是否处于主动拖动状态
		 */
		isDraging: boolean = false
		/**
		 * 标记是否拖动过一次
		 */
		isDragOnce: boolean = false
		/**
		 * 端点位置
		 */
		pos: Vector2 = new Vector2()
		/**
		 * 绑定的槽点
		 */
		slotViewModel = RefData(SlotViewModel)

		/**
		 * 是否已绑定端点
		 */
		get isPortBinded(): boolean {
			return !this.isDraging && !!this.slotViewModel
		}

		/**
		 * 是否判定为已拆离
		 */
		get isInDepart(): boolean {
			let modelPos = this.slotViewModel.transform.getWorldPosition()
			let selfPos = this.pos
			if (selfPos.distance(modelPos) - this.slotViewModel.radius > 2) {
				return true
			}
			return false
		}

	}

	export class EdgeViewModel extends NodeViewModel {

		/**
		 * 线长
		 */
		edgeLen() {
			return this.inputJointViewModel.pos.distance(this.outputJointViewModel.pos)
		}

		init() {
			this.inputJointViewModel.jointPos = SlotPosType.in
			this.outputJointViewModel.jointPos = SlotPosType.out
			return super.init()
		}

		/**
		 * 边缘信息
		 */
		edgeInfo = RefData(EdgeInfo)

		inputJointViewModel = NewData(EdgeJointViewModel)
		outputJointViewModel = NewData(EdgeJointViewModel)

		public get inputSlotViewModel() {
			return this.inputJointViewModel.slotViewModel
		}
		public set inputSlotViewModel(value) {
			this.inputJointViewModel.slotViewModel = value
		}
		public get outputSlotViewModel() {
			return this.outputJointViewModel.slotViewModel
		}
		public set outputSlotViewModel(value) {
			this.outputJointViewModel.slotViewModel = value
		}

		/**
		 * 当前连线是否处于主动拖动状态
		 */
		public get isDragingInput(): bool {
			return this.inputJointViewModel.isDraging
		}
		public set isDragingInput(value: bool) {
			if (this.inputJointViewModel.isDraging != value) {
				this.inputJointViewModel.isDragOnce = this.inputJointViewModel.isDraging
				this.inputJointViewModel.isDraging = value
			}
		}
		public get isDragingOutput(): bool {
			return this.outputJointViewModel.isDraging
		}
		public set isDragingOutput(value: bool) {
			if (this.outputJointViewModel.isDraging != value) {
				this.outputJointViewModel.isDragOnce = this.outputJointViewModel.isDraging
				this.outputJointViewModel.isDraging = value
			}
		}

		public get arrowPos(): Vector2 {
			return this.outputJointViewModel.pos
		}
		public set arrowPos(value: Vector2) {
			this.outputJointViewModel.pos.merge(value)
		}
		public get tailPos(): Vector2 {
			return this.inputJointViewModel.pos
		}
		public set tailPos(value: Vector2) {
			this.inputJointViewModel.pos.merge(value)
		}

		updateLayout() {
			let tailPos = this.tailPos
			let arrowPos = this.arrowPos
			let isInputBinded = !this.isDragingInput && !!this.inputSlotViewModel
			let isOutputBinded = !this.isDragingOutput && !!this.outputSlotViewModel
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
