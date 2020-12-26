
namespace flowui {

	export class GroupPipeView extends DynView {

		syncFromModel(viewModel: GroupPipeViewModel): void {
			this.viewModel = viewModel

			let nodeName = viewModel.pipeInfo.name
			let title = nodeName
			let titleEditor = this.titleView.getComp(EditorComp)
			if (!titleEditor.isWritable) {
				this.title = title
			}

			let slotEditor = this.slotEditor.getComp(EditorComp)
			slotEditor.isWritable = viewModel.isSlotSpecCodeEditable
			if (!slotEditor.isWritable) {
				slotEditor.text = viewModel.slotSpecCode
			}

		}

		viewModel: GroupPipeViewModel
		titleView: NodeView
		background: NodeView
		slotEditor: NodeView

		protected totalSize = new Size2(140, 120)

		onLoad() {
			const totalSize = this.totalSize

			this.addComp(DragableComp)

			const background = this.createChild(null, [RoundRectComp])
			this.background = background
			background.width = totalSize.width
			background.height = totalSize.height

			const titleView = this.createChild(null, [RectComp, EditorComp,])
			this.titleView = titleView
			titleView.width = totalSize.width - 20
			titleView.height = 12
			titleView.y = -totalSize.height / 2 + 12
			let eidtorComp = titleView.getComp(EditorComp)
			eidtorComp.text = "标题"
			eidtorComp.event.on(EditorEvent.leaveedit, () => {
				this.viewModel.pipeInfo.name = eidtorComp.text
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
				this.viewModel.slotSpecCode = slotEditorComp.text
				this.viewModel.isSlotSpecCodeEditable = false
			})

		}

		private _title: string;
		public get title(): string {
			return this._title;
		}
		public set title(value: string) {
			this._title = value;
			this.titleView.getComp(EditorComp).text = value
		}

		public get contentSize(): Size2 {
			return this.background.contentSize
		}
		public set contentSize(value: Size2) {
			this.background.contentSize = value
		}
	}
}
