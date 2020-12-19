
namespace flowui {

	export class PipeView extends NodeView {
		labelView: NodeView
		background: NodeView
		editor: NodeView

		protected totalSize = new Size2(100, 200)

		onLoad() {
			const totalSize = this.totalSize

			const background = this.createChild(null, [RectComp])
			this.background = background
			background.width = totalSize.width
			background.height = totalSize.height

			this.labelView = this.createChild(null, [LabelComp])
			this.labelView.y = totalSize.height / 2 - 10

			const editor = this.createChild(null, [EditorComp])
			editor.y = -10
			const editorComp = editor.getComp(EditorComp)
			editorComp.hint = "点我输入..."

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
