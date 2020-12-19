

namespace flowui {
	export class PipeViewModel extends ViewModelBase {
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
		 */
		isExpand: boolean

		/**
		 * 是否包含代码
		 */
		get isOwnCode(): boolean {
			return this.pipeTemp instanceof CodePipeTemp
		}

		/**
		 * 是否组装
		 */
		get isGroup(): boolean {
			return this.pipeTemp instanceof GroupPipeTemp
		}


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
		 * 是否展示模板规格定义代码
		 */
		isShowSlotSpecCode: boolean = false

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
