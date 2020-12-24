
namespace flowui {
	export class SlotView extends DynView {
		syncFromModel(viewModel: SlotViewModel): void {
			this.viewModel = viewModel

			this.position = viewModel.transform.position
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
				let curPos = dragComp.curPos.clone()

				let edgeViewModel = this.newEdgeViewModel
				if (!edgeViewModel) {
					edgeViewModel = this.newEdgeViewModel = New(EdgeViewModel)
				}
				edgeViewModel.tailPos = startPos
				edgeViewModel.arrowPos = curPos
			})
			dragComp.event.on(DragEvent.dragend, (evt) => {
				if (this.newEdgeViewModel) {
					this.newEdgeViewModel = null
				}
			})
		}
	}
}
