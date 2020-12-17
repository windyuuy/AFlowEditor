

namespace flowui {
	export class BodyViewModel extends ViewModelBase {
		init() {
			return this
		}

		/**
		 * 管线实例信息
		 */
		bodyInfo: BodyInfo
		/**
		 * 管线展开模板信息
		 */
		bodyTemp: BodyTemp

		/**
		 * 管线是否处于展开状态
		 */
		isExpand: boolean

		/**
		 * 是否包含代码
		 */
		get isOwnCode(): boolean {
			return this.bodyTemp instanceof CodeBodyTemp
		}

		/**
		 * 是否组装
		 */
		get isGroup(): boolean {
			return this.bodyTemp instanceof GroupBodyTemp
		}


		/**
		 * 模板规格定义代码
		 */
		public get slotSpecCode(): string {
			return this.bodyTemp.slotSpecCode
		}
		public set slotSpecCode(value: string) {
			this.bodyTemp.slotSpecCode = value
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
