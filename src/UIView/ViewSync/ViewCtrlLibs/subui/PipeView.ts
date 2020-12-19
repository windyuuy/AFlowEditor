
namespace flowui {
	import Group = ccs.Group;

	export class PipeView extends NodeView {
		labelView: ccs.Label

		onLoad() {
			// this.labelView
			this.addComp(RectComp)
			this.addComp(EditorComp)
		}
	}
}
