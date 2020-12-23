

namespace flowui {
	export class CodePipeViewModel extends PipeViewModel {
		init() {
			return this
		}

		/**
		 * 管线实例信息
		 */
		pipeInfo: PipeInfo
		/**
		 * 管线展开模板信息
		 */
		pipeTemp: PipeTemp

		/**
		 * 管线是否处于展开状态
		 * 暂时无效
		 */
		isExpand: boolean = false

		/**
		 * 是否代码块
		 */
		readonly isOwnCode: boolean = true

		/**
		 * 是否组装体
		 */
		readonly isGroup: boolean = false


		/**
		 * 模板规格定义代码
		 */
		public get slotSpecCode(): string {
			return this.pipeTemp.slotSpecCode
		}
		public set slotSpecCode(value: string) {
			this.pipeTemp.slotSpecCode = value
		}

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
