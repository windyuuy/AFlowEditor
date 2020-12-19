
/// <reference path="ViewBase.ts" />

namespace flowui {
	import Group = ccs.Group;

	export class NodeView extends ViewBase {

		protected setupView() {
			let group = new Group()

			let position = this.position
			group.attr({
				pos: [position.x, position.y],
			})

			return group
		}

		createChild<T extends NodeView = NodeView>(cls?: new () => T, comps?: (new () => ViewComp)[]): T {
			let child = New(cls || NodeView)
			child.parent = this
			if (comps) {
				child.addComps(comps)
			}
			return child as T
		}

	}
}
