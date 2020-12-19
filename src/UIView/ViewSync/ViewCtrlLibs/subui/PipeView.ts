
namespace flowui {
	import Group = spritejs.Group;

	export class PipeView extends NodeView {

		onLoad() {
			this.addComp(RectComp)
			this.addComp(EditorComp)
		}
	}
}
