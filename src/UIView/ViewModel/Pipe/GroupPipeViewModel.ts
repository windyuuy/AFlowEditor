

namespace flowui {
	export class GroupPipeViewModel extends PipeViewModel {
		init() {
			return super.init()
		}

		/**
		 * 管线实例信息
		 */
		pipeInfo: PipeInfo
		/**
		 * 管线展开模板信息
		 */
		pipeTemp: GroupPipeTemp

		/**
		 * 管线是否处于展开状态
		 */
		isExpand: boolean = false

		/**
		 * 是否包含代码
		 */
		isOwnCode: boolean = false

		/**
		 * 是否组装
		 */
		isGroup: boolean = true

		/**
		 * 是否正在编辑块规格
		 */
		isSlotSpecCodeEditable: boolean = false

		/**
		 * 当前代码是否可编辑
		 */
		isCodeEditable: boolean = false

		/**
		 * 当前代码是否处于展示状态
		 */
		isShowingCode: boolean = false

	}
}
