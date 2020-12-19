
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
		pipeTemps: PipeTemp[]

		init() {
			this.pipeTemps = CleanArray(this.pipeTemps)

			return this
		}
	}

}