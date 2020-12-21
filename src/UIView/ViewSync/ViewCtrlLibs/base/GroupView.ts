
/// <reference path="ViewBase.ts" />

namespace flowui {
	import Path = spritejs.Path;
	import Label = spritejs.Label;
	import Group = spritejs.Group;

	export class GroupView extends ViewBase {

		setupView() {
			let group = new spritejs.Group()
			return group
		}

	}
}
