
namespace flowui {

	export class PipeView extends NodeView {
		labelView: NodeView
		background: NodeView
		editor: NodeView

		protected totalSize = new Size2(140, 100)

		onLoad() {
			const totalSize = this.totalSize

			const background = this.createChild(null, [RoundRectComp])
			this.background = background
			background.width = totalSize.width
			background.height = totalSize.height

			this.addComp(DragableComp)

			this.labelView = this.createChild(null, [LabelComp])
			this.labelView.y = -totalSize.height / 2 + 12
			this.labelView.getComp(LabelComp).text = "标题"

			const editor = this.createChild(null, [RectComp, EditorComp])
			editor.width = totalSize.width - 20
			editor.height = totalSize.height - 40
			editor.y = 10

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
