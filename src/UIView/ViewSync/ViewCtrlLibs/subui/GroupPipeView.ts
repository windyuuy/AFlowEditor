
namespace flowui {

	export class GroupPipeView extends NodeView implements IViewSync {
		syncFromModel(viewModel: GroupPipeViewModel): void {
		}
		labelView: NodeView
		background: NodeView
		slotEditor: NodeView

		protected totalSize = new Size2(140, 120)

		onLoad() {
			const totalSize = this.totalSize

			this.addComp(DragableComp)

			const background = this.createChild(null, [RoundRectComp])
			this.background = background
			background.width = totalSize.width
			background.height = totalSize.height

			const labelView = this.createChild(null, [GLLabelComp])
			this.labelView = labelView
			labelView.y = -totalSize.height / 2 + 12
			labelView.getComp(GLLabelComp).text = "标题"

			const slotEditor = this.createChild(null, [RectComp, EditorComp])
			this.slotEditor = slotEditor
			slotEditor.width = totalSize.width - 20
			slotEditor.height = 26
			slotEditor.y = -totalSize.height / 2 + 38

		}

		private _title: string;
		public get title(): string {
			return this._title;
		}
		public set title(value: string) {
			this._title = value;
			this.labelView.getComp(GLLabelComp).text = value
		}

		public get contentSize(): Size2 {
			return this.background.contentSize
		}
		public set contentSize(value: Size2) {
			this.background.contentSize = value
		}
	}
}
