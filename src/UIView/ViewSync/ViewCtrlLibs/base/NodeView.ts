
/// <reference path="ViewBase.ts" />

namespace flowui {
	import Group = ccs.Group;

	export class NodeView extends ViewBase {

		setupView() {
			let group = new Group()

			let position = this.position
			group.attr({
				pos: [position.x, position.y],
			})

			return group
		}
	}
}
