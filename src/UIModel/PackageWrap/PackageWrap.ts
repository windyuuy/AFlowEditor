
namespace flowui {
	/**
	 * 包信息
	 */
	export class PackageWrap {
		/**
		 * 包路径
		 */
		path: string

		/**
		 * 节点模板列表
		 */
		bodyTemps: BodyTemp[]

		init() {
			this.bodyTemps = CleanArray(this.bodyTemps)

			return this
		}
	}

}