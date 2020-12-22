
namespace flowui {
	export class AsyncSlotView extends NodeView implements IViewSync {
		syncFromModel(viewModel: ViewModelBase): void {
			throw new Error("Method not implemented.")
		}

		shapeView: NodeView

		onLoad() {
			this.shapeView = this.createChild(null, [EllipseComp, DragableComp])
			const shapeView = this.shapeView
			shapeView.width = 10
			shapeView.height = 10
			const ellipseComp = shapeView.getComp(EllipseComp)
			ellipseComp.radius = 5

		}
	}
}
