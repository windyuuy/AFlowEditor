

namespace flowui {

	export class PipeCodeViewModel extends CompViewModel {
		layout: WidgetLayout = NewData(WidgetLayout)
	}

	export class CodePipeViewModel extends PipeViewModel {
		init() {
			this.codeViewModel = New(PipeCodeViewModel)
			return super.init()
		}

		/**
		 * 管线实例信息
		 */
		pipeInfo: PipeInfo
		/**
		 * 管线展开模板信息
		 */
		pipeTemp: CodePipeTemp

		/**
		 * 代码布局
		 */
		codeViewModel = RefData(PipeCodeViewModel)

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

		public get pipeCode(): string {
			return this.pipeTemp.code
		}
		public set pipeCode(value: string) {
			this.pipeTemp.code = value
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

		initLayout() {

			super.initLayout()

			{
				const layout = this.codeViewModel.layout
				this.codeViewModel.transformParent = this
				layout.sizeOffset.width = this.layout.borderSize.width - 20
				layout.sizeOffset.height = this.layout.borderSize.height - 40
				layout.parentAnchor.y = 0.5
				layout.selfAnchor.y = -0.5

			}

		}

	}
}
