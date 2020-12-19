
namespace flowui {
	import Group = spritejs.Group;

	export class PipeView extends NodeView {

		setupView() {
			let group = new Group()

			let worldPosition = this.position
			group.attr({
				pos: [worldPosition.x, worldPosition.y],
			})

			return group
		}
	}
}
