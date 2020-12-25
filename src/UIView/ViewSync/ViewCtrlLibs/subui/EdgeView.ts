
namespace flowui {
	export class EdgeView extends DynView {
		syncFromModel(viewModel: EdgeViewModel): void {
			this.viewModel = viewModel

			this.arrowPos = viewModel.arrowPos
			this.tailPos = viewModel.tailPos
		}

		viewModel: EdgeViewModel
		lineView: NodeView
		lineHeadPt: NodeView
		lineTailPt: NodeView

		onLoad() {
			this.lineView = this.createChild(NodeView)
			const lineView = this.lineView
			const arrowLineComp = lineView.addComp(ArrowLineComp)
			arrowLineComp.arrowLength = 6
			arrowLineComp.arrowWidth = 7
			arrowLineComp.arrowTailWidth = 2

			// 增加头部端点
			this.lineHeadPt = this.createChild(NodeView)
			const lineHead = this.lineHeadPt
			const ellipseComp = lineHead.addComp(EllipseComp)
			ellipseComp.radius = 3
			lineHead.addComp(DragableComp)
			lineHead.event.onNamedEvent2(`ondrag_${this.oid}`, "onDragUpdate", (evt) => {
				// this.lineView.getComp(ArrowLineComp).endPos = lineHead.position
				this.viewModel.arrowPos = lineHead.position
			})

			// 增加尾部端点
			this.lineTailPt = this.createChild(NodeView)
			const lineEnd = this.lineTailPt
			lineEnd.addComp(DragableComp)
			const circleEnd = lineEnd.addComp(EllipseComp)
			circleEnd.radius = 3
			lineEnd.addComp(DragableComp)
			lineEnd.event.onNamedEvent2(`ondrag_${this.oid}`, "onDragUpdate", (evt) => {
				// this.lineView.getComp(ArrowLineComp).beginPos = lineEnd.position
				this.viewModel.tailPos = lineEnd.position
			})
		}

		/**
		 * 设置箭头尾部位置
		 */
		set tailPos(value: Vector2) {
			this.lineTailPt.position = value
			this.lineView.getComp(ArrowLineComp).beginPos = value
		}
		get tailPos() {
			return this.lineView.getComp(ArrowLineComp).beginPos
		}

		/**
		 * 设置箭头头部位置
		 */
		set arrowPos(value: Vector2) {
			this.lineHeadPt.position = value
			this.lineView.getComp(ArrowLineComp).endPos = value
		}
		get arrowPos() {
			return this.lineView.getComp(ArrowLineComp).endPos
		}

	}
}
