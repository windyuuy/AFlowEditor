
namespace flowui {
	export class SlotGroupView extends DynView {
		syncFromModel(viewModel: NodeViewModel): void {
			// this.position = viewModel.transform.position
			this.viewModel = viewModel

			ViewLayoutHelper.applyModelLayout(this, this.viewModel)
			this.backgroundView.contentSize = this.contentSize
		}

		backgroundView: NodeView

		onLoad() {
			// 创建动态背景
			{
				this.backgroundView = this.createChild(null, [RectComp, DragableComp])
				const groupView = this.backgroundView
				const rectComp = groupView.getComp(RectComp)
				this.backgroundView.width = 40
				this.backgroundView.height = 40
			}

			this.updateLayout()
		}

		public get height(): number {
			return this.backgroundView.height
		}
		public set height(value: number) {
			this.backgroundView.height = value
		}

		updateLayout() {

		}

	}
}
