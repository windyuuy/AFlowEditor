
namespace flowui {
	export class SlotView extends DynView {
		syncFromModel(viewModel: SlotViewModel): void {
			this.viewModel = viewModel

			ViewLayoutHelper.applyModelLayout(this, this.viewModel)
		}

		viewModel: SlotViewModel
		shapeView: NodeView

		newEdgeViewModel: EdgeViewModel

		onLoad() {
			this.shapeView = this.createChild(null, [EllipseComp, DragableComp])
			const shapeView = this.shapeView
			shapeView.width = 10
			shapeView.height = 10
			const ellipseComp = shapeView.getComp(EllipseComp)
			ellipseComp.radius = shapeView.width

			const dragComp = this.shapeView.getComp(DragableComp)
			dragComp.isFollowDrag = false
			dragComp.event.on(DragEvent.grabmove, (evt) => {
				let startPos = this.position.clone()
				let curPos = dragComp.dragOffset.addUp(this.position)

				let edgeViewModel = this.newEdgeViewModel
				if (!edgeViewModel) {
					edgeViewModel = this.newEdgeViewModel = this.createEdgeViewModel()
				}

				this.updateEdgeDraggingState(true)

				if (edgeViewModel.isDragingInput) {
					edgeViewModel.tailPos = curPos
				} else if (edgeViewModel.isDragingOutput) {
					edgeViewModel.arrowPos = curPos
				}

			})
			dragComp.event.on(DragEvent.grabend, (evt) => {
				if (this.newEdgeViewModel) {
					CmdManager.runCmd({
						name: "创建连线",
						forward: () => {
							this.updateEdgeDraggingState(false)
							this.newEdgeViewModel = null
						}
					})
				}
			})
		}

		/**
		 * 更新连线拖动状态
		 */
		protected updateEdgeDraggingState(b: boolean) {
			const edgeViewModel = this.newEdgeViewModel
			// console.log("this.viewModel.slotTemp.slotPos:", this.viewModel.slotTemp.slotPos)
			if (this.viewModel.slotTemp.slotPos == SlotPosType.out) {
				edgeViewModel.isDragingOutput = b
			} else if (this.viewModel.slotTemp.slotPos == SlotPosType.in) {
				edgeViewModel.isDragingInput = b
			} else {
				throw new Error("unsupport slot pos")
			}
		}

		protected createEdgeViewModel() {
			const edgeViewModel = New(EdgeViewModel)
			// TODO: 需要考虑或者屏蔽逆向连线
			switch (this.viewModel.slotTemp.slotPos) {
				case SlotPosType.in: {
					edgeViewModel.outputSlotViewModel = this.viewModel
					break
				}
				case SlotPosType.out: {
					edgeViewModel.inputSlotViewModel = this.viewModel
					break
				}
				default: {
					throw new Error("unsupport slot pos")
				}
			}
			return edgeViewModel
		}
	}
}
