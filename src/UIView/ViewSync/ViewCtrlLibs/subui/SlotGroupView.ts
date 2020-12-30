
namespace flowui {
	export class SlotGroupView extends DynView {
		syncFromModel(viewModel: NodeViewModel): void {
			// this.position = viewModel.transform.position
			this.viewModel = viewModel

			ViewLayoutHelper.applyModelLayout(this, this.viewModel)

		}

		groupView: NodeView

		onLoad() {
			this.groupView = this.createChild(null, [RectComp, DragableComp])
			const groupView = this.groupView
			const rectComp = groupView.getComp(RectComp)
			this.groupView.width = 40
			this.groupView.height = 40

			this.updateLayout()
		}

		public get height(): number {
			return this.groupView.height
		}
		public set height(value: number) {
			this.groupView.height = value
		}

		updateLayout() {

		}

	}
}
