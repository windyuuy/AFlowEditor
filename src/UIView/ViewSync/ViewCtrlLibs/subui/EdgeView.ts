
namespace flowui {
	export class EdgeView extends NodeView implements IViewSync {
		syncFromModel(viewModel: ViewModelBase): void {
			throw new Error("Method not implemented.")
		}
		lineView: NodeView
		lineHead: NodeView
		lineTail: NodeView

		onLoad() {
			this.lineView = this.createChild(NodeView)
			const lineView = this.lineView
			const arrowLineComp = lineView.addComp(ArrowLineComp)
			arrowLineComp.arrowLength = 6
			arrowLineComp.arrowWidth = 7
			arrowLineComp.arrowTailWidth = 2

			// 增加头部端点
			this.lineHead = this.createChild(NodeView)
			const lineHead = this.lineHead
			const ellipseComp = lineHead.addComp(EllipseComp)
			ellipseComp.radius = 3
			lineHead.addComp(DragableComp)
			lineHead.event.onNamedEvent2(`ondrag_${this.oid}`, "onDragUpdate", (evt) => {
				this.lineView.getComp(ArrowLineComp).endPos = lineHead.position
			})

			// 增加尾部端点
			this.lineTail = this.createChild(NodeView)
			const lineEnd = this.lineTail
			lineEnd.addComp(DragableComp)
			const circleEnd = lineEnd.addComp(EllipseComp)
			circleEnd.radius = 3
			lineEnd.addComp(DragableComp)
			lineEnd.event.onNamedEvent2(`ondrag_${this.oid}`, "onDragUpdate", (evt) => {
				this.lineView.getComp(ArrowLineComp).beginPos = lineEnd.position
			})
		}

		/**
		 * 设置箭头尾部位置
		 */
		set tailPos(value: Vector2) {
			this.lineTail.position = value
			this.lineView.getComp(ArrowLineComp).beginPos = value
		}
		get tailPos() {
			return this.lineView.getComp(ArrowLineComp).beginPos
		}

		/**
		 * 设置箭头头部位置
		 */
		set headPos(value: Vector2) {
			this.lineHead.position = value
			this.lineView.getComp(ArrowLineComp).endPos = value
		}
		get headPos() {
			return this.lineView.getComp(ArrowLineComp).endPos
		}

	}
}
