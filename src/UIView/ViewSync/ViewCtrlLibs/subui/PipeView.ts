
namespace flowui {
	import Group = ccs.Group;

	export class PipeView extends NodeView {
		labelView: NodeView

		onLoad() {
			this.addComp(RectComp)
			this.addComp(EditorComp)

			const labelView = New(NodeView)
			labelView.parent = this
			this.labelView = labelView
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
