
/// <reference path="../DynView.ts" />

namespace flowui {

	export class CodePipeView extends DynView {
		syncFromModel(viewModel: CodePipeViewModel): void {
			this.viewModel = viewModel

			ViewLayoutHelper.applyModelLayout(this, this.viewModel)

			{
				const titleView = this.titleView
				let titleEditor = titleView.getComp(EditorComp)
				if (!titleEditor.isWritable) {
					this.title = viewModel.pipeInfo.name
				}
				ViewLayoutHelper.applyModelLayout(titleView, viewModel.titleViewModel)
			}

			{
				let slotEditor = this.slotEditor.getComp(EditorComp)
				if (!slotEditor.isWritable) {
					slotEditor.text = viewModel.slotSpecCode
				}
				ViewLayoutHelper.applyModelLayout(this.slotEditor, viewModel.slotCodeViewModel)
			}

			{
				let codeEditor = this.codeEditor.getComp(EditorComp)
				if (!codeEditor.isWritable) {
					codeEditor.text = viewModel.pipeCode
				}
				ViewLayoutHelper.applyModelLayout(this.codeEditor, viewModel.codeViewModel)
			}
		}

		viewModel: CodePipeViewModel
		titleView: NodeView
		background: NodeView
		codeEditor: NodeView
		slotEditor: NodeView

		protected totalSize = new Size2(140, 120)

		onLoad() {
			const totalSize = this.totalSize

			this.addComp(DragableComp)

			const background = this.createChild(null, [RoundRectComp])
			this.background = background
			background.width = totalSize.width
			background.height = totalSize.height

			const titleView = this.createChild(null, [RectComp, EditorComp])
			this.titleView = titleView
			titleView.width = totalSize.width - 20
			titleView.height = 12
			titleView.y = -totalSize.height / 2 + 12
			let eidtorComp = titleView.getComp(EditorComp)
			eidtorComp.text = "标题"
			eidtorComp.event.on(EditorEvent.leaveedit, () => {
				CmdManager.runCmd({
					name: "修改标题",
					forward: () => {
						this.viewModel.pipeInfo.name = eidtorComp.text
					}
				})
			})

			const slotEditor = this.createChild(null, [RectComp, EditorComp])
			this.slotEditor = slotEditor
			slotEditor.width = totalSize.width - 20
			slotEditor.height = 26
			slotEditor.y = -totalSize.height / 2 + 38
			const slotEditorComp = slotEditor.getComp(EditorComp)
			slotEditorComp.event.on(EditorEvent.enteredit, () => {
				this.viewModel.isSlotSpecCodeEditable = true
			})
			slotEditorComp.event.on(EditorEvent.leaveedit, () => {
				this.viewModel.isSlotSpecCodeEditable = false
				CmdManager.runCmd({
					name: "修改槽点代码",
					forward: () => {
						this.viewModel.slotSpecCode = slotEditorComp.text
					}
				})
			})

			const codeEditor = this.createChild(null, [RectComp, EditorComp])
			this.codeEditor = codeEditor
			codeEditor.width = totalSize.width - 20
			codeEditor.height = totalSize.height - 68
			codeEditor.y = (totalSize.height / 2 - 10 - codeEditor.height / 2)
			const codeEditorComp = codeEditor.getComp(EditorComp)
			codeEditorComp.event.on(EditorEvent.enteredit, () => {
				this.viewModel.isCodeEditable = true
			})
			codeEditorComp.event.on(EditorEvent.leaveedit, () => {
				this.viewModel.isCodeEditable = false
				CmdManager.runCmd({
					name: "修改代码",
					forward: () => {
						this.viewModel.pipeCode = codeEditorComp.text
					}
				})
			})

		}

		private _title: string;
		public get title(): string {
			return this._title;
		}
		public set title(value: string) {
			this._title = value;
			this.titleView.getComp(GLLabelComp).text = value
		}

		public get height(): number {
			return this.background.height
		}
		public set height(value: number) {
			this.background.height = value
		}

	}
}
