
namespace flowui {
	export class SlotGroupView extends DynView {
		syncFromModel(viewModel: ViewModelBase): void {
			this.position = viewModel.transform.position
		}
		groupView: NodeView

		onLoad() {
			this.groupView = this.createChild(null, [RectComp, DragableComp])
			const groupView = this.groupView
			const rectComp = groupView.getComp(RectComp)
			this.groupView.width = 40
			this.groupView.height = 40

		}

		public get height(): number {
			return this.groupView.height
		}
		public set height(value: number) {
			this.groupView.height = value
		}
	}
}
