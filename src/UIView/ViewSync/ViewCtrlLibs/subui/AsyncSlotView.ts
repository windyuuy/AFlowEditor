
namespace flowui {
	export class AsyncSlotView extends NodeView {

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
