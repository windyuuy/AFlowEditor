
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
			dragComp.event.on(DragEvent.dragmove, (evt) => {
				let startPos = this.position.clone()
				let curPos = dragComp.dragOffset.addUp(this.position)

				// 需要根据方向重新计算起始焊点
				let startJointPos = curPos.clone()
					.subDown(startPos)
					.normalizeSelf()
					.multUpVar(ellipseComp.radius)
					.addUp(startPos)

				let edgeViewModel = this.newEdgeViewModel
				if (!edgeViewModel) {
					edgeViewModel = this.newEdgeViewModel = this.createEdgeViewModel()
				}
				edgeViewModel.tailPos = startJointPos
				edgeViewModel.arrowPos = curPos
				edgeViewModel.isDraging = true
			})
			dragComp.event.on(DragEvent.dragend, (evt) => {
				if (this.newEdgeViewModel) {
					CmdManager.runCmd({
						name: "创建连线",
						forward: () => {
							this.newEdgeViewModel.isDraging = false
							this.newEdgeViewModel = null
						}
					})
				}
			})
		}

		protected createEdgeViewModel() {
			const edgeViewModel = New(EdgeViewModel)
			// TODO: 需要考虑或者屏蔽逆向连线
			edgeViewModel.inputSlotViewModel = this.viewModel
			return edgeViewModel
		}
	}
}
