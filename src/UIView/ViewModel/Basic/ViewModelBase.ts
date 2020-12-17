
namespace flowui {
	export class ViewModelBase {
		transform: Transform

		init() {
			this.transform = new Transform()
			return this
		}

		clear() {

		}

	}
}
