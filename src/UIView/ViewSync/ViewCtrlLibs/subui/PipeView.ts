
namespace flowui {

	export class PipeView extends NodeView {
		labelView: NodeView
		background: NodeView
		codeEditor: NodeView
		slotEditor: NodeView

		protected totalSize = new Size2(140, 120)

		onLoad() {
			const totalSize = this.totalSize

			this.addComp(DragableComp)

			const background = this.createChild(null, [RoundRectComp])
			this.background = background
			background.width = totalSize.width
			background.height = totalSize.height

			const labelView = this.createChild(null, [LabelComp])
			this.labelView = labelView
			labelView.y = -totalSize.height / 2 + 12
			labelView.getComp(LabelComp).text = "标题"

			const slotEditor = this.createChild(null, [RectComp, EditorComp])
			this.slotEditor = slotEditor
			slotEditor.width = totalSize.width - 20
			slotEditor.height = 26
			slotEditor.y = -totalSize.height / 2 + 38

			const codeEditor = this.createChild(null, [RectComp, EditorComp])
			this.codeEditor = codeEditor
			codeEditor.width = totalSize.width - 20
			codeEditor.height = totalSize.height - 68
			codeEditor.y = (totalSize.height / 2 - 10 - codeEditor.height / 2)

		}

		private _title: string;
		public get title(): string {
			return this._title;
		}
		public set title(value: string) {
			this._title = value;
			this.labelView.getComp(LabelComp).text = value
		}
	}
}
