
namespace flowui {
	export class SyncSlotView extends NodeView {

		shapeView: NodeView

		onLoad() {
			this.shapeView = this.createChild(null, [TriangleComp, DragableComp])
			const shapeView = this.shapeView
			shapeView.width = 10
			shapeView.height = 10
			const triangleComp = shapeView.getComp(TriangleComp)
			triangleComp.halfWidth = shapeView.width / 2
			triangleComp.rotate = -90

		}
	}
}
