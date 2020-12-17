
namespace flowui {

	export interface IUpdater {
		update()
	}

	export class SystemBase implements IUpdater {
		init() {
			return this
		}

		update() {
		}
	}

}
