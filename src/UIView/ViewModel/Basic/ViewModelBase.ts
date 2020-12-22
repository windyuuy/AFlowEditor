
namespace flowui {
	export class ViewModelBase implements IDataClass {
		readonly oid: string;
		/**
		 * 类型名
		 */
		readonly otype: string

		transform: Transform

		init() {
			this.transform = new Transform()
			return this
		}

		clear() {

		}

		updateLayout() {

		}

	}
}
