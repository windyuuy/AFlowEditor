
namespace flowui {
	import Group = spritejs.Group;

	export class BodyView extends NodeView {

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
