
/// <reference path="ViewModelBase.ts" />

namespace flowui {
	export class CompViewModel extends ViewModelBase {

		set transformParent(parent: ViewModelBase) {
			// this.transform.parent = parent.transform
			this.layout.parent = parent.layout
		}

	}
}
